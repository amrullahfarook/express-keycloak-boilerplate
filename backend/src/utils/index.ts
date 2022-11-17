import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import config from '../../config';

import axios from 'axios';
import qs from 'qs';
 


// export const generatePassword = async (password : any) => {
//         return await bcrypt.hash(password, Number(config.salt));
// };


export const validatePassword = async (enteredPassword : any, savedPassword : any ) => {
  return bcrypt.compare(enteredPassword, savedPassword);
};

export const generateToken = async (payload : any) => {
  // return await jwt.sign(payload,`${config.accessTokenKey}` , { expiresIn: '10m'} )

  const response = await axios({
    method: 'post',
    url: `${config.authServerUrl}realms/master/protocol/openid-connect/token`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data: qs.stringify({
      grant_type: 'client_credentials',
      client_id: config.tokenClientId,
      client_secret: config.tokenSecretId,
    }),
  }); 
        
  return response.data;

};

export const generateRefreshToken = async (payload : any) =>{
  return jwt.sign(payload, 'refreshkeysecret', { expiresIn :'2d' } );
};



module.exports.FormateData = (data :any) => {
  if (data) {
    return { data };
  } else {
    throw new Error('Data Not found!');
  }
};