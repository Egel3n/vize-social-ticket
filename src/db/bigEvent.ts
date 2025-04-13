import client from "./dbClient";

export const createBigEvent = async (event, OrganizationID) => {
  const {
    name,
    price,
    country,
    city,
    district,
    place,
    quota,
    eventDate,
    type,
    text,
    file,
  } = event;

  const photoArray = [];
  file.forEach((element) => {
    photoArray.push(element.filename);
  });

  try {
    const event = await client.bigEvent.create({
      data: {
        name,
        price: Number(price),
        country,
        city,
        district,
        place,
        quota: Number(quota),
        eventDate: new Date(eventDate),
        picture: photoArray,
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
  const events = await client.bigEvent.findMany({
    include: { Organization: true },
  });
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
