import express, { Router } from 'express';
import { handleRegister, handleLogin, protectedRoute, refreshToken } from '../controllers/user.controller';
import { auth } from '../middlewares/auth';

import { initKeycloak } from '../../../config/keycloak-config';
const keycloak = initKeycloak();


const userRouter : Router = express.Router();


userRouter.post('/register', handleRegister);
userRouter.post('/login', handleLogin);

userRouter.post('/refreshtoken', auth, refreshToken);


//add test protected route 
userRouter.get('/private', keycloak.protect(), protectedRoute);

export default userRouter;

