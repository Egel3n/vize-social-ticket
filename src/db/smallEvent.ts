import client from "./dbClient";

export const createEvent = async (comingEvent, user) => {
  const { eventDate, location, ...rest } = comingEvent;

  const event = await client.smallEvent.create({
    data: {
      ...rest,
      ownerID: user.id,
      eventDate: new Date(eventDate),
      location: {
        type: "Point",
        coordinates: location,
      },
      userPoint: 50,
      userName: user.name,
    },
  });
  return event;
};

export const listEventByDistance = async (lat, lng, distance) => {
  const locations = await client.smallEvent.findRaw({
    filter: {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseFloat(distance) * 1000, // Metric
        },
      },
      isActive: true,
    },
  });

  return locations;
};

export const getEventByID = async (id) => {
  const event = await client.smallEvent.findUnique({
    where: {
      id,
    },
  });
  return event;
};

export const passiveEvent = async (userID, eventID) => {
  const deletedEvent = await client.smallEvent.update({
    where: {
      ownerID: userID,
      id: eventID,
    },
    data: {
      isActive: false,
    },
  });
  return deletedEvent;
};

export const passiveExpiredEvents = async () => {
  await client.smallEvent.updateMany({
    where: {
      creationDate: {
        lt: new Date(Date.now() - 20 * 60 * 1000),
      },
      isActive: true,
    },
    data: {
      isActive: false,
    },
  });
};

export const getEventsByUserID = async (id) => {
  const events = await client.smallEvent.findMany({
    where: {
      ownerID: id,
    },
    orderBy: {
      creationDate: "desc",
    },
  });

  return events;
};

export const updateAtendees = async (eventID, atendees) => {
  const updated = await client.smallEvent.update({
    where: {
      id: eventID,
    },
    data: {
      currentAtendees: atendees,
    },
  });
  return updated;
};

export const createAtendee = async (eventID, userID) => {
  const attandance = await client.smallEventAttendee.findFirst({
    where: {
      userID,
      eventID,
    },
  });

  if (attandance) throw new Error("Request Already Sended");

  await client.smallEventAttendee.create({
    data: {
      userID,
      eventID,
      status: "REQUEST_SENDED",
    },
  });
};

export const updateAtendeeStatus = async (
  eventID: string,
  userID: string,
  status
) => {
  await client.smallEventAttendee.updateMany({
    where: {
      userID: userID,
      eventID: eventID,
    },
    data: {
      status,
      approvalDate: new Date(),
    },
  });
};

export const listAtandanceRequests = async (eventID) => {
  const list = await client.smallEventAttendee.findMany({
    where: {
      eventID,
    },
  });
  return list;
};

import { connectMongoose } from "./mongoose"; // Mongoose bağlantı dosyan
import { SmallEvent } from "./models/SmallEvent"; // Mongoose SmallEvent modeli
import { User } from "./models/User"; // Gerekirse modeli buradan da içeri alabilirsin

export const listNearbySmallEvents = async (
  lat: number,
  lng: number,
  distance: number
) => {
  await connectMongoose();

  const events = await SmallEvent.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(lng.toString()), parseFloat(lat.toString())], // GeoJSON formatı
        },
        distanceField: "distance", // yeni alan olarak eklenecek
        maxDistance: parseFloat(distance.toString()) * 1000, // kilometre → metre
        query: { isActive: true },
        spherical: true,
      },
    },
    {
      $lookup: {
        from: "User", // Doğru koleksiyon adı
        localField: "ownerID",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $unwind: "$owner", // her event için tek bir user olacağını varsayıyoruz
    },
  ]);

  return events;
};
