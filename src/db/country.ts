import client from "./dbClient";

export const getAllCountries = async () => {
  const countries = await client.country.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return countries;
};
