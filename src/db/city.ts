import client from "./dbClient";

export const getallCities = async (countryID) => {
  return client.city.findMany({
    where: {
      countryID,
    },
  });
};
