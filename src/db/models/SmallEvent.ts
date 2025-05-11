import mongoose, { Schema } from "mongoose";

const SmallEventSchema = new Schema({
  name: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  isActive: Boolean,
  eventDate: Date,
  creationDate: Date,
  currentAtendees: Number,
  quoaota: Number,
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

SmallEventSchema.index({ location: "2dsphere" }); // Geo index

export const SmallEvent =
  mongoose.models.SmallEvent ||
  mongoose.model("SmallEvent", SmallEventSchema, "SmallEvent");
