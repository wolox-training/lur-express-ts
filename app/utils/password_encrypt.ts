import bcryptjs from 'bcryptjs';

export function passwordEncrypt(password: string): string {
  if (!password) {
    throw new Error('password is required');
  }

  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
}
