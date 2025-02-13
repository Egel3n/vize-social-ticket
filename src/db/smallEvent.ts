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
          $maxDistance: parseFloat(distance) * 1000, // Metre cinsinden
        },
      },
    },
  });

  return locations;
};
