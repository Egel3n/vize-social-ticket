import client from "./dbClient";

export const createEvent = async (comingEvent, userID) => {
  const { eventDate, location, ...rest } = comingEvent;

  const event = await client.smallEvent.create({
    data: {
      ...rest,
      ownerID: userID,
      eventDate: new Date(eventDate),
      location: {
        type: "Point",
        coordinates: location,
      },
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
