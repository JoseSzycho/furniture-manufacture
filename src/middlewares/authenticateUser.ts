/* eslint-disable @typescript-eslint/no-throw-literal */
import { Request, Response, NextFunction } from 'express';
import { Error } from '../types';
import * as Auth from '../databases/Auth';
/**
 * Authenticate a user by its request token. If token is not valid,
 * response with 401.
 * @param req The request
 * @param res The response
 * @param next The next middleware
 */
const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('authorization');

  try {
    if (token) {
      const tokenType = await Auth.getTokenType(token);
      if (tokenType === 'token') {
        next();
        return;
      }
    }
  } catch (error) { // If database error
    res.status((error as Error).status).json((error as Error).message);
    return;
  }

  const error: Error = {
    status: 401,
    message: 'Token is not valid for authentication',
  };
  res.status(error.status).json(error.message);
};

export default authenticateUser;
