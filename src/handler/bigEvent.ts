import * as db from "../db/bigEvent";

export const newBigEvent = async (req, res, next) => {
  const body = req.body;
  body.file = req.files["eventphotos"];

  if (!req.user.organizationName) {
    res.status(401).json({ message: "not an organization" });
  }

  try {
    const event = await db.createBigEvent(body, req.user.id);
    res.status(201).json({ message: "event created", data: event });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//if type is not selected must be all
export const listEvents = async (req, res, next) => {
  const { countryID, cityID, type } = req.query;
  try {
    const events = await db.listEventsByCity(countryID, cityID, type);
    res.status(200).json({ data: events });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const listAllEvents = async (req, res, next) => {
  try {
    const events = await db.getAllEvents();
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

export const makeAComment = async (req, res, next) => {
  const userID = req.user.id;
  const { text, bigEventID } = req.body;

  try {
    console.log(bigEventID);
    const comment = await db.createComment(bigEventID, userID, text);
    res.status(201).json({ data: comment });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  const bigEventID = req.params.id;
  try {
    const comments = await db.listComments(bigEventID);
    res.status(200).json({ data: comments });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
