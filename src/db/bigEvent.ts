import client from "./dbClient";

export const createEvent = async (event, OrganizationID) => {
  const { name, price, picture ,country, city, district, place, quota, eventDate } =
    event;
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
        eventDate,
        picture,
        OrganizationID
      },
    });
  } catch (error) {}
};
