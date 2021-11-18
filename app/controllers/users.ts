import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import userService from '../services/users';
import { User } from '../models/user';
import { notFoundError } from '../errors';
import {userValidations} from "../utils/users";

export function getUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return userService
    .findAll()
    .then((users: User[]) => res.send(users))
    .catch(next);
}

export function createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { firstName, lastName, email, password } = req.body;

  if(!firstName || !lastName || !email || !password)
      res.status(HttpStatus.BAD_REQUEST).send({message: 'firstName, lastName, email and password are required'})

  const pendingValidations = userValidations(firstName, lastName, email, password)
    if(pendingValidations)
        res.status(HttpStatus.BAD_REQUEST).send({message: pendingValidations})

  userService
    .createUser({ firstName, lastName, email, password } as User)
    .then((user: User) => {
        
        res.status(HttpStatus.CREATED).send({ user }))
    }
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
