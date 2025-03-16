import client from "./dbClient";

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

export const getFriendshipID = async (friend1, friend2) => {
  const friendship = await client.friend.findFirst({
    where: {
      AND: [
        {
          OR: [
            {
              userFirstID: friend1,
            },
            {
              userFirstID: friend2,
            },
          ],
        },
        {
          OR: [
            {
              userSecondID: friend1,
            },
            {
              userSecondID: friend2,
            },
          ],
        },
      ],
    },
  });
  if (!friendship) throw new Error("No friendship found");
  return friendship.id;
};
