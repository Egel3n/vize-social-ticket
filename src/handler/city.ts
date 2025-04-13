import * as db from "../db/city";

export const allCities = async (req, res, next) => {
  const counrtyID = req.params.id;
  const cities = await db.getallCities(counrtyID);
  res.status(200).json(cities);
};
