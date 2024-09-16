import jwt from 'jsonwebtoken';
import { RegisteredUser } from '../models/register-input.model';

const generateToken = (user: Partial<RegisteredUser>): string =>
  jwt.sign(user, process.env.JWT_SECRET || 'superSecret', { expiresIn: '60d' });

export default generateToken;
