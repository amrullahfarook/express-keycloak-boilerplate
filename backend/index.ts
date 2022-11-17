
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import config from './config';
import  userRouter from './src/api/routes/user.routes';

// import connection from './database/connection';

import * as dotenv from 'dotenv';
dotenv.config();

const app : Express = express();

import { getKeycloak } from './config/keycloak-config';
const keycloak = getKeycloak();
// connection()

app.use(cors());
app.use(express.json());
app.use((bodyparser.urlencoded({ extended: true })));
app.use(keycloak.middleware()); 


app.get('/', (req : Request, res : Response) =>{
  res.json({ data : 'hello' });
});

app.use('/user', userRouter);


app.listen(config.port, ()=>{
  console.log(`Server running at ${config.port}`);
});

