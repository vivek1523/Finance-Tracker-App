import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BASE_URL } from "../../utils/url";
import axios from 'axios';

const token = getUserFromStorage();

export const loginAPI = async({email,password} )=>{
   const response = await axios.post(`${BASE_URL}/users/login`,{
    email,
    password
   });

   return response.data;
}

export const registerAPI = async({email,password, userName} )=>{
    const response = await axios.post(`${BASE_URL}/users/register`,{
     email,
     password,
     userName,
    });
 
    return response.data;
 }

 export const changePasswordAPI = async ({ newPassword }) => {
   const token = getUserFromStorage(); // Fetch token inside the function

   if (!token) {
       throw new Error('No authentication token found');
   }

   const response = await axios.put(`${BASE_URL}/users/changepassword`, {
       newPassword,
   }, {
       headers: {
           Authorization: `Bearer ${token}` // Ensure Bearer is in backticks
       }
   });

   return response.data;
};

export const updateProfileAPI = async({email, userName} )=>{
   const response = await axios.put(`${BASE_URL}/users/update-profile`,{
    email, 
    userName,
   },{
      headers:{
         Authorization: `Bearer ${token}`
     }
   });

   return response.data;
}