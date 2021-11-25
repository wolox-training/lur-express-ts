import bcryptjs from 'bcryptjs';

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
