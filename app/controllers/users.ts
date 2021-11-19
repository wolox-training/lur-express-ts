import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import userService from '../services/users';
import { User } from '../models/user';
import { badRequest, databaseError, notFoundError, unprocessableEntity } from '../errors';
import { userValidations, passwordEncrypt } from '../utils/users';
import logger from '../logger';

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

// eslint-disable-next-line consistent-return
export async function createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    next(badRequest);
  }

  const pendingValidations = await userValidations(firstName, lastName, email, password);

  if (pendingValidations) {
    logger.error(`createUser: user creation failed ${pendingValidations}`);
    next(unprocessableEntity);
  }

  userService
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
