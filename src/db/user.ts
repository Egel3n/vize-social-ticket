import client from "./dbClient";
import { hashPassword } from "../middleware/auth";

export const allUsers = async () => {
  const data = await client.user.findMany();
  console.log(data);
};

export const createUser = async (data) => {
  try {
    const user = await client.user.create({
      data: {
        name: data.name,
        lastName: data.lastname,
        password: await hashPassword(data.password),
        profilePicture: data.file.filename,
        username: data.username,
      },
    });
    return user;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const userByUsername = async (username) => {
  try {
    const user = await client.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const getUserByID = async (id) => {
  const user = await client.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const sendFriendRequest = async (senderID, receiverID) => {
  const friendship = await client.friend.create({
    data: {
      userFirstID: senderID,
      userSecondID: receiverID,
    },
  });
  return friendship;
};

export const getFriendshipRequests = async (id) => {
  const friendshipList = await client.friend.findMany({
    where: {
      userSecondID: id,
      status: "Pending",
    },
  });

  return friendshipList;
};

export const updateStatusFriendshipRequest = async (id, status) => {
  const updatedRequest = await client.friend.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};
