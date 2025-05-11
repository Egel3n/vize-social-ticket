import mongoose, { Schema } from "mongoose";

const SmallEventAttendeeSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SmallEvent",
      required: true,
    },
    status: {
      type: String,
      enum: ["REQUEST_SENDED", "REQUEST_APPROVED", "REQUEST_CANCELED"],
      default: "REQUEST_SENDED",
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    approvalDate: {
      type: Date,
      default: null,
    },
  },
  {
    collection: "SmallEventAttendee",
  }
);

export const SmallEventAttendee =
  mongoose.models.SmallEventAttendee ||
  mongoose.model(
    "SmallEventAttendee",
    SmallEventAttendeeSchema,
    "SmallEventAttendee"
  );
