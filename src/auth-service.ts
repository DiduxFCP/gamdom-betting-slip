import { Request, Response } from 'express';
import { pool } from '../db';
import {
  GET_USER_QUERY,
  REGISTER_NEW_USER_QUERY
} from './auth-queries';
import { AuthQueryResult, ResponseReturnType } from './types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// This is a security issue.
// In a real world application, secret key should be stored in a vault, as an example.
const SECRET_KEY = 'This is unsafe';

const registerUser = async (req: Request, res: Response): Promise<ResponseReturnType> => {
  console.log('Register User - POST Request');

  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result: AuthQueryResult = await pool.query(REGISTER_NEW_USER_QUERY, [username, hashedPassword]);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      bettingSlipId: result.rows[0].id
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Internal server error - Unable to register user with: ${error}`
    });
  }
};

const loginUser = async (req: Request, res: Response): Promise<ResponseReturnType> => {
  console.log('Login User - POST Request');

  try {
    const { username, password } = req.body;
    const userResult: AuthQueryResult = await pool.query(GET_USER_QUERY, [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed - Invalid username'
      });
    }

    const { id: userId, password: hashedPassword } = userResult.rows[0];

    if (await bcrypt.compare(password, hashedPassword)) {
      const token = jwt.sign({ id: userId }, SECRET_KEY);

      return res.status(200).json({
        success: true,
        token,
        userId
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication failed - Wrong password'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Internal server error - Unable to login user with: ${error}`
    });
  }
};

const authenticateToken = (req: Request, res: Response, next: any): Response<any, Record<string, any>> | undefined => {
  const token = req.header('Authorization');

  if (token === undefined) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized - No Authorization Header specified'
    });
  }

  jwt.verify(token, SECRET_KEY, (err: any) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden User'
      });
    }

    next();
  });
}

export {
  registerUser,
  loginUser,
  authenticateToken
}
