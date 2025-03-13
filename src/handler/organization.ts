import * as db from "../db/organization";
import { comparePassword, createOrgJWT } from "../middleware/auth";

export const sign = async (req, res, next) => {
  const body = req.body;
  body.file = req.files["profilepicture"][0];
  body.verification = req.files["verification"][0];
  console.log(body);

  try {
    const org = await db.createOrganization(body);
    res.status(201).json({ message: "organization Created", data: org });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  const body = req.body;
  const orgName = body.organizationName;
  const password = body.password;

  try {
    const org = await db.orgByName(orgName);
    if (!org) {
      res.send(401).json({ message: "no org found" });
      return;
    }
    if (!comparePassword(password, org.password)) {
      res.send(401).json({ message: "wrong password" });
      return;
    }
    const token = createOrgJWT(org);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getOrgPP = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await db.orgByID(id);
    res.status(200).json({
      url: "http://localhost:8000/profilepicture/" + user.profilePicture,
    });
  } catch (error) {
    next(error);
  }
};
