// const {findUser,createUser, findUserById}= require('../../database/repository/user.repository')
const { FormateData, generatePassword, generateToken, validatePassword } = require('../utils/index');
import config from '../../config/index';
import qs from 'qs';
import axios from 'axios';


export const registerUser = async (userInputs: any) => {
  const { username, email, password } = userInputs;
  const TOKEN_DATA = await generateToken();
  console.log(TOKEN_DATA);

  try {
        
    //  const checkExistingUser = await findUser({email})
         

    // if(!checkExistingUser){ 
            
            
    //     let hashedPassword = await generatePassword(password)
    //     //console.log("1zz")
    //     const newUser = await createUser({name,email,password:hashedPassword})
            
    //     const token = await generateToken({email: newUser.email, _id: newUser._id})

    //     return {id:newUser._id, token}

    // } else {

    //     return {error : "Email already registered"}
    // }

    const response = await axios({
      method: 'post',
      url: `${process.env.AUTH_SERVER_URL}admin/realms/${process.env.REALM}/users`,
      data: {
        'enabled': true,
        'username': username,
        'email': email,
        'credentials': [{
          'type': 'password',
          'value': password,
          'temporary': false,
        }],
      },
      headers: {
        Authorization: `Bearer ${TOKEN_DATA.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
        
  } catch (error) {
    console.log(error);
    return { error : error };
  }
};

export const loginUser = async (userInputs : any) => {

  const { username, password } = userInputs;

  console.log(`${config.authServerUrl}realms/${config.realm}/protocol/openid-connect/token`);
  console.log(config.secret);
  console.log(username);

  try {
    const response = await axios({
      method: 'post',
      url: `${process.env.AUTH_SERVER_URL}/realms/${process.env.REALM}/protocol/openid-connect/token`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: qs.stringify({
        grant_type: 'password',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.SECRET_ID,
        username: username,
        password: password,
      }),
    });
    
    // console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }

};

// export const userFind = async (id : any) => {
//     try {
//         const user = await findUserById({id})
//         return user
//     } catch (error) {
        
//     }
// }
