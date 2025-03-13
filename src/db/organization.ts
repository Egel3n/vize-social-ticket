import { hashPassword } from "../middleware/auth";
import client from "./dbClient";

export const createOrganization = async (organization) => {
  const { organizationName, password } = organization;

  try {
    const org = await client.organization.create({
      data: {
        organizationName,
        profilePicture: organization.file.filename,
        document: organization.verification.filename,
        password: await hashPassword(password),
      },
    });
    return org;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const orgByName = async (organizationName) => {
  try {
    const org = await client.organization.findUnique({
      where: { organizationName },
    });
    return org;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const orgByID = async (id) => {
  return await client.organization.findUnique({
    where: {
      id,
    },
  });
};
