import express from "express";
import router from "./router";
import cors from "cors";

import { protectRoute } from "./middleware/auth";
import { login as loginUser, sign as signUser } from "./handler/user";
import { login as loginOrg, sign as signOrg } from "./handler/organization";

import upload from "./middleware/fileware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user/sign", upload.single("pp"), signUser);
app.post("/user/login", loginUser);

app.post("/org/sign", signOrg);
app.post("/org/login", loginOrg);

app.use("/api", protectRoute, router); // protect this route

export default app;
