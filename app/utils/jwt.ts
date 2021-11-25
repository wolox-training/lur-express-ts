import jwt from 'jwt-simple';
import { User } from '../models/user';
import config from '../../config';

export function getToken(user: User): string {
  const payload = { id: user.id, email: user.email };
  return jwt.encode(payload, config.common.session.secret);
}

export default { getToken };
