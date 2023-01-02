import { NextFunction, Request, Response } from "express";
import createUserToken from "../../utils/auth/createUserToken";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import { compareWithHash } from "../../utils/hashPasswords";
import userViewer from "../../view/userViewer";

/**
 * Users controller for the login function sending a valid jwt token in the response if login is successful.
 * @param req Request with a body property body containing a json with user object with name and email as properties.
 * @param res Response
 */
export default async function userLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body.user;
  try {
    // Get the user with given email
    const getUser = await userGetPrisma(username);
    if (!getUser) return res.sendStatus(404);

    // Compare the user password given with the one stored
    console.log(password, getUser.password);
    if (!compareWithHash(password, getUser.password)) return res.sendStatus(403);

    // Create the user token for future authentication
    const token = createUserToken(username);

    // Create the user view containing the authentication token
    const userView = userViewer(username, token);

    return res.json(userView);
  } catch (error) {
    return next(error);
  }
}
