import express from "express";
import router from "./router";
import cors from "cors";
import path from "path";

import { protectRoute } from "./middleware/auth";
import {
  getUserPP,
  login as loginUser,
  sign as signUser,
} from "./handler/user";
import {
  getOrgPP,
  login as loginOrg,
  sign as signOrg,
} from "./handler/organization";

import { upload } from "./middleware/fileware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/profilepicture", express.static(path.join(__dirname, "www/pp")));

// USER ENDPOINTS
//app.post("/user/sign", upload.single("ege"), signUser);
app.post("/user/login", loginUser);
app.get("/user/profile/:id", getUserPP);

app.post(
  "/user/sign",
  upload.fields([{ name: "profilepicture", maxCount: 1 }]),
  signUser
);

// ORG ENDPOINTS
app.post(
  "/org/sign",
  upload.fields([
    { name: "profilepicture", maxCount: 1 },
    { name: "verification", maxCount: 1 },
  ]),
  signOrg
);
app.post("/org/login", loginOrg);
app.get("/org/profile/:id", getOrgPP);

app.use("/api", protectRoute, router); // protect this route

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "There was an error" });
});

export default app;
