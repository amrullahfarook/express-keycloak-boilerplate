import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../../services/user.service';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
  user: any | JwtPayload;
}

export const handleRegister = async (req :Request, res : Response, next : NextFunction) =>{
  try {
    const { username, email, password } = req.body;
    const data = await registerUser({ username, email, password });
    return res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const handleLogin = async (req : Request, res : Response, next : NextFunction) =>{
  try {
    const { username, password } = req.body;
    const data = await loginUser({ username, password });
    return res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const refreshToken = async (req : Request, res : Response ) =>{
    
};    

export const protectedRoute = async (req : Request, res : Response) => {
  try {
    res.status(200).json({
      message: 'successful protected route',
      user : (req as CustomRequest).user,
    });
  } catch (error) {
    res.status(500).json({
      error : error,
    });
  }
};