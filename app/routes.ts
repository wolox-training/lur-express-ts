import { Application } from 'express';
import { healthCheck } from './controllers/healthCheck';
import { getUsers, getUserById, createUser, authUser } from './controllers/users';
import { getTodos } from './controllers/todos';
import { getCardsInfo, getAllCards } from './controllers/cards';
import { usersHandleMiddleware } from './middlewares/users';
import { User } from './schemas/users';
import { HTTP_CODES } from './constants';

export const init = (app: Application): void => {
  app.get('/health', healthCheck);
  app.get('/users', getUsers);
  app.post('/users', [usersHandleMiddleware(User, HTTP_CODES.UNPROCESSABLE_ENTITY)], createUser);
  app.get('/users/:id', getUserById);
  app.get('/todos', getTodos);
  app.get('/info', getCardsInfo);
  app.get('/cards', getAllCards);
  app.post('/users/sesions', authUser);
};
