import * as db from "../db/bigEvent";

export const newBigEvent = async (req, res, next) => {
  const body = req.body;

  if (!req.user.organizationName) {
    res.status(401).json({ message: "not a organization" });
  }

  try {
    const event = await db.createBigEvent(body, req.user.id);
    res.status(201).json({ message: "event created", data: event });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const listEvents = async (req, res, next) => {
  const { country, city } = req.params;
  try {
    const events = await db.listEventsByCity(country, city);
    res.status(200).json({ data: events });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getEvent = async (req, res, next) => {
  const id = req.params.id;
  try {
    const event = await db.eventByID(id);
    res.status(200).json({ data: event });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
