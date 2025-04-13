import * as db from "../db/country";

export const getCountries = async (req, res, next) => {
  try {
    const counrtries = await db.getAllCountries();
    res.status(200).json(counrtries);
  } catch (error) {
    next(error);
  }
};
