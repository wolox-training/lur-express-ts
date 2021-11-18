import { getRepository, FindManyOptions, FindConditions, Repository, DeepPartial } from 'typeorm';
import { User } from '../models/user';
import { userValidations, passwordEncrypt } from '../utils/users';

const userRepository = (): Repository<User> => getRepository(User);

export function findUser(options?: FindConditions<User>): Promise<User | undefined> {
  return userRepository().findOne(options);
}

export function createAndSave(user: User): Promise<User> {
  return userRepository().save(user);
}

export async function createUser(user: User): Promise<User | string> {
  const { firstName, lastName, email, password } = user;

  const validationsPending = await userValidations(firstName, lastName, email, password);

  if (validationsPending) {
    return validationsPending;
  }

  return createAndSave({ firstName, lastName, email, password: passwordEncrypt(password) } as User);
}

export function findAll(options?: FindManyOptions): Promise<User[]> {
  return userRepository().find(options);
}

export function createMany(users: DeepPartial<User>[]): Promise<User[]> {
  return userRepository().save(users);
}

export default {
  findAll,
  createMany,
  findUser,
  createUser
};
