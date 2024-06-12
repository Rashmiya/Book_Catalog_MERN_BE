/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../utils/config';

export const permissions = async (req: Request,res: Response,next: NextFunction) => {
  console.log('request has come...!');
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(403).json('No token found');
    }
    try {
      const data: any = jwt.verify(token, config.jwt_secret_key);
      if (data) {
        return next();
      } else {
        return res.status(403).send('Do not have Permission');
      }
    } catch {
      return res.status(403).json('Invalid Token');
    }
    
  } catch (err) {
    console.log(err);
  }
};
  