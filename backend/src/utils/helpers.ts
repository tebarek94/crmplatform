import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { JWTPayload } from '../types';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload: JWTPayload): string => {
  const secret: Secret = process.env.JWT_SECRET || 'default_secret';
  
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  } as jwt.SignOptions);
};

export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const paginate = (page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;
  return { limit, offset };
};

