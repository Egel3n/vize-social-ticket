import client from "./dbClient";

export const createBigEvent = async (event, OrganizationID) => {
  const {
    name,
    price,
    picture,
    country,
    city,
    district,
    place,
    quota,
    eventDate,
    type,
    text,
  } = event;
  try {
    const event = await client.bigEvent.create({
      data: {
        name,
        price,
        country,
        city,
        district,
        place,
        quota,
        eventDate: new Date(eventDate),
        picture,
        type,
        OrganizationID,
        text,
      },
    });
    return event;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const listEventsByCity = async (country, city, type) => {
  let queryObject;

  if (type === "all") {
    queryObject = {
      where: {
        city,
        country,
        type,
      },
      orderBy: {
        eventDate: "desc",
      },
    };
  } else {
    queryObject = {
      where: {
        city,
        country,
      },
      orderBy: {
        eventDate: "desc",
      },
    };
  }

  const events = await client.bigEvent.findMany(queryObject);
  return events;
};

export const getAllEvents = async () => {
  const events = await client.bigEvent.findMany();
  return events;
};

export const eventByID = async (id) => {
  const event = await client.bigEvent.findUnique({
    where: {
      id,
    },
  });
  return event;
};

export const createComment = (bigEventID, userID, text) => {
  const comment = client.bigEventComments.create({
    data: {
      commentBody: text,
      userID,
      bigEventID,
    },
  });

  return comment;
};

export const listComments = (bigEventID) => {
  const comments = client.bigEventComments.findMany({
    where: {
      bigEventID,
    },
    orderBy: {
      creationDate: "desc",
    },
    include: {
      user: {
        select: {
          username: true,
          profilePicture: true,
        },
      },
    },
  });

  return comments;
};
