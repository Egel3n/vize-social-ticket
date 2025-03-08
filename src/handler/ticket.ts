import * as db from "../db/ticket";
import { eventByID } from "../db/bigEvent";

export const buyTicket = async (req, res, next) => {
  const { userIDs, eventID } = req.body; //multiple userIDs for gifts
  const result = [];

  try {
    const event = await eventByID(eventID);
    const price = event.price; // get event's price

    for (let i = 0; i < userIDs.length; i++) {
      result.push(await db.createTicket(eventID, userIDs[i], price));
    }
    res.status(201).json({ message: "successfully purchased", data: result });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getUserTickets = async (req, res, next) => {
  const userID = req.params.id;
  try {
    const tickets = await db.getTicketsByUserID(userID);
    res.status(200).json({ data: tickets });
  } catch (error) {
    next(error);
  }
};

export const refundTicket = async (req, res, next) => {
  const ticketID = req.params.id;
  try {
    const updatedTicket = await db.refundTicket(ticketID);
    res.status(200).json({ message: "ticket refunded" });
  } catch (error) {
    next(error);
  }
};

export const getTicketByID = async (req, res, next) => {
  const ticketID = req.params.id;
  try {
    const ticket = await db.getTicket(ticketID);
    res.status(200).json({ data: ticket });
  } catch (error) {
    next(error);
  }
};
