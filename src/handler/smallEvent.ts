import client from "../db/dbClient";
import * as db from "../db/smallEvent";

export const createSmallEvent = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "unauthorized" });
  }

  try {
    const events = await db.getEventsByUserID(req.user.id);
    if (events[0].isActive) {
      res.status(402).json({ messsage: "already have an active event" });
      return;
    }
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

export const checkExpiredEventsJOB = async () => {
  try {
    await db.passiveExpiredEvents();
  } catch (error) {
    console.log(error);
  }
};

export const getUserEventList = async (req, res, next) => {
  try {
    const events = await db.getEventsByUserID(req.user.id);
    res.status(200).json({ data: events });
  } catch (error) {
    next(error);
  }
};

export const incrementAtendeeCount = async (req, res, next) => {
  const id = req.body.eventID;
  const userID = req.user.id;
  try {
    const event = await db.getEventByID(id);
    if (!event) res.status(404).json({ message: "Event not exist" });
    if (event.quoata === event.currentAtendees) throw Error("Quota is full");
    const updatedAtendees = event.currentAtendees + 1;
    await db.updateAtendees(id, updatedAtendees);
    res.status(201).json({ messsage: "incremented" });
  } catch (error) {
    next(error);
  }
};

export const decrementAtendeeCount = async (req, res, next) => {
  const id = req.body.eventID;
  const userID = req.user.id;
  try {
    const event = await db.getEventByID(id);
    if (!event) res.status(404).json({ message: "Event not exist" });
    if (event.currentAtendees === 0) throw Error("No atendees");
    const updatedAtendees = event.currentAtendees - 1;
    await db.updateAtendees(id, updatedAtendees);
    res.status(201).json({ messsage: "decremented" });
  } catch (error) {
    next(error);
  }
};
