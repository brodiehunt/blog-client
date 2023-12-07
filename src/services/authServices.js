import api from '../config/api';


export const registerUser = async (userInfo) => {
  const response = await api.post('/api/auth/register', userInfo);
  return response.data;
}