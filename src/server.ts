import express from "express";
import router from "./router";
import cors from "cors";
import path from "path";
import cron from "node-cron";

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

import { checkExpiredEventsJOB } from "./handler/smallEvent";

import { upload } from "./middleware/fileware";

const app = express();

app.use(
  cors({
    origin: "*", // veya React Native uygulamanın adresi
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cron.schedule("*/1 * * * *", checkExpiredEventsJOB); //cron job for passivizing expired smallEvents

app.use("/profilepicture", express.static(path.join(__dirname, "www/pp")));
app.use("/verification", express.static(path.join(__dirname, "www/orgfiles")));
app.use(
  "/eventphotos",
  express.static(path.join(__dirname, "www/eventphotos"))
);

// USER ENDPOINTS
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

app.use("/*", (req, res) => {
  res.status(404).json({ message: "unvalid url" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

export default app;
