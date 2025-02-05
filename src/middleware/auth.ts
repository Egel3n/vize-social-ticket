import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const createOrgJWT = (organization) => {
  const token = jwt.sign(
    {
      id: organization.id,
      organizationName: organization.organizationName,
    },
    process.env.JWT_SECRET
  );
  return token;
};

export const protectRoute = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401).json({ message: "unvalid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "unauthorized" });
  }
};
