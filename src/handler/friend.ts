import * as db from "../db/friend";
import { getUserByID } from "../db/user";
export const addFriend = async (req, res, next) => {
  const senderID = req.user.id;
  const receiverID = req.params.id;
  try {
    const friend = getUserByID(receiverID);
    if (!friend) throw Error("User does not exist");
    await db.sendFriendRequest(senderID, receiverID);
    res.status(201).json({ message: "Friendship request has been sent" });
  } catch (error) {
    next(error);
  }
};

export const getListFriendRequests = async (req, res, next) => {
  try {
    const list = await db.getFriendshipRequests(req.user.id);
    res.status(200).json({ data: list });
  } catch (error) {
    next(error);
  }
};

export const acceptFriendshipRequest = async (req, res, next) => {
  const friendshipID = req.params.id;
  try {
    const updated = await db.updateStatusFriendshipRequest(
      friendshipID,
      "Accepted"
    );
    res.status(200).json({ data: updated });
  } catch (error) {
    next(error);
  }
};
export const rejectFriendshipRequest = async (req, res, next) => {
  const friendshipID = req.params.id;
  try {
    const updated = await db.updateStatusFriendshipRequest(
      friendshipID,
      "Rejected"
    );
    res.status(200).json({ data: updated });
  } catch (error) {
    next(error);
  }
};

export const removeFriend = (req, res, next) => {
  const userID = req.user.id;
  const friendID = req.params.id;
  try {
    const friendshipID = db.getFriendshipID(userID, friendID);
    db.updateStatusFriendshipRequest(friendshipID, "Removed");
    res.status(200).json({ message: "Friend Removed" });
  } catch (error) {
    next("error");
  }
};

export const findFriendshipID = async (req, res, next) => {
  const user = req.user.id;
  const friend = req.params.id;
  try {
    const friendshipID = await db.getFriendshipID(user, friend);
    res.status(200).json({ data: friendshipID });
  } catch (error) {
    next(error);
  }
};
