import client from "../db/dbClient";
import * as db from "../db/smallEvent";

export const createSmallEvent = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "unauthorized" });
  }

  try {
    const event = await db.createEvent(req.body, req.user.id);
    res.status(201).json({ message: "event created", data: event });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getSmallEvents = async (req, res, next) => {
  const { lat, lng, dist } = req.query;
  console.log("HELLO WORLD" + lat);

  try {
    const events = await db.listEventByDistance(lat, lng, dist);
    res.status(200).json({ data: events });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getSmallEventByID = async (req, res, next) => {
  const { id } = req.query;
  try {
    const event = await db.getEventByID(id);
    res.status(200).json({ data: event });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  const eventID = req.params.id;
  const userID = req.user.id;

  try {
    const deletedEvent = await db.passiveEvent(userID, eventID);
    res.status(204);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
