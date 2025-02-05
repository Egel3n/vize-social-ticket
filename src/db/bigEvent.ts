import client from "./dbClient";

export const createBigEvent = async (event, OrganizationID) => {
  const {
    name,
    price,
    picture,
    country,
    city,
    district,
    place,
    quota,
    eventDate,
  } = event;
  try {
    const event = await client.bigEvent.create({
      data: {
        name,
        price,
        country,
        city,
        district,
        place,
        quota,
        eventDate: new Date(eventDate),
        picture,
        OrganizationID,
      },
    });
    return event;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const listEventsByCity = async (country, city) => {
  const events = await client.bigEvent.findMany({
    where: {
      city,
      country,
    },
    orderBy: {
      eventDate: "desc",
    },
  });
  return events;
};

export const eventByID = async (id) => {
  const event = await client.bigEvent.findUnique({
    where: {
      id,
    },
  });
  return event;
};
