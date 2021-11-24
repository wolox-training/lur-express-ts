import bcryptjs from 'bcryptjs';
import { User } from '../models/user';
import { findUser } from '../services/users';

function isOnlyAlphabeticCharacters(value: string): boolean {
  const alphabeticCharactersRegExp = new RegExp(
    /^[a-zA-ZáâäãéêëíîïóôöõúûüūñçčšžÁÂÄÃĆÉÊËÍÎÏÓÔÖÕÚÛÜŪÑßÇ' .]+$/i
  );
  return alphabeticCharactersRegExp.test(value);
}

function emailIsValid(email: string): boolean {
  const emailRegExp = new RegExp(
    /^[a-z0-9]+(?!.*(?:\+{2,}|-{2,}|\.{2,}))(?:[.+-]{0,1}[a-z0-9])*@wolox\.com$/gim
  );
  return emailRegExp.test(email);
}

function emailExist(email: string): Promise<User | undefined> {
  return findUser({ email });
}

function passwordIsValid(password: string): boolean {
  const passwordRegExp = new RegExp(/^[a-zA-Z0-9áéíóú]\S{7,}$/g);
  return passwordRegExp.test(password);
}

export async function userValidations(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<string | null> {
  if (!isOnlyAlphabeticCharacters(firstName)) return 'First name can only contain alphabetic characters';

  if (!isOnlyAlphabeticCharacters(lastName)) return 'Last name can only contain alphabetic characters';

  if (!emailIsValid(email)) return 'Invalid email format';

  if (await emailExist(email)) return 'Email is already registered';

  if (!passwordIsValid(password)) return 'Password must be at least 8 characters long, alphanumerica';

  return null;
}

export function passwordEncrypt(password: string): string {
  if (!password) {
    throw new Error('password is required');
  }

  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
}

export function passwordMatch(requestPassword: string, userPassword: string): boolean {
  if (!requestPassword) {
    throw new Error('requestPassword is required');
  }
  if (!userPassword) {
    throw new Error('userPassword is required');
  }

  return bcryptjs.compareSync(requestPassword, userPassword);
}

export default { userValidations, passwordEncrypt, passwordMatch };
