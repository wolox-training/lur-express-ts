import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import userService from '../services/users';
import { User } from '../models/user';
import { databaseError, notFoundError, unprocessableEntity } from '../errors';
import { passwordEncrypt } from '../utils/password_encrypt';
import logger from '../logger';
import {getToken} from "../utils/jwt";

export function getUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return userService
    .findAll()
    .then((users: User[]) => res.send(users))
    .catch(next);
}

export function getUserById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return userService
    .findUser({ id: parseInt(req.params.id) })
    .then((user: User) => {
      if (!user) {
        throw notFoundError('User not found');
      }
      return res.send(user);
    })
    .catch(next);
}

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { firstName, lastName, email, password } = req.body;
  const userData = await userService.findUser({ email });
  if (userData) {
    next(unprocessableEntity);
  }
  return userService
    .createAndSave({
      firstName,
      lastName,
      email,
      password: passwordEncrypt(password)
    } as User)
    .then((userCreated: User) => {
      logger.info(`createUser: user ${email} created`);
      res.status(HttpStatus.CREATED).send({ userCreated });
    })
    .catch(() => {
      logger.error('createUser: error saving to database');
      next(databaseError);
    });
}

export async function authUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { email, password } = req.body;

  try {
    const user: User | undefined = await userService.findUser({email});

    if (!user) {
      next(authenticationError('username or password are invalid'));
    }

    // @ts-ignore
    if (!passwordMatch(password, user.password)) {
      next(authenticationError('username or password are invalid'));
    }

    const token = getToken(user?.id, user?.email)
    res.json({token})

  }
  catch(error){
    logger.error(`authUser error ${error}`);
    next(databaseError(error));
  }

}
