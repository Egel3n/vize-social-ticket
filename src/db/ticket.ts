import client from "./dbClient";

export const createTicket = async (eventID, userID, price) => {
  try {
    const ticket = await client.ticket.create({
      data: {
        price,
        bigEventID: eventID,
        userID: userID,
      },
    });
    return ticket;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getTicketsByUserID = async (userID) => {
  const tickets = await client.ticket.findMany({
    where: {
      userID,
    },
  });
  return tickets;
};

export const refundTicket = async (ticketID) => {
  const ticket = await client.ticket.update({
    where: {
      id: ticketID,
    },
    data: {
      isRefunded: true,
    },
  });

  return ticket;
};

export const getTicket = async (ticketID) => {
  const ticket = await client.ticket.findUnique({
    where: {
      id: ticketID,
    },
  });

  return ticket;
};
