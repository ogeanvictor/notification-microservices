import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConstanst = {
  secret: process.env.JWT_SECRET,
};
