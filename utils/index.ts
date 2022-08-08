import axios from 'axios';
import jwt_decorde from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  
  const decoded: { name: string, picture: string, sub: string } = jwt_decorde(response.credential);
  
  const { name, picture, sub } = decoded;

  //create sanity user object using the information from the google login credentials
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  }; 

  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};