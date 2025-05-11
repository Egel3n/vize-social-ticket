import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: { type: String },
    active: { type: Boolean, default: true },
    creationDate: { type: Date, default: Date.now },
  },
  {
    collection: "User", // Prisma'daki koleksiyon adı birebir eşleşiyor
  }
);

export const User =
  mongoose.models.User || mongoose.model("User", UserSchema, "User");
