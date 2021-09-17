import bcryptjs from 'bcryptjs';
import { baseUrl, urls } from './constants';
import post from './request';

const login = async (username, password) => {
  const url = `${baseUrl}${urls.login}`;
  const saltRounds = 10;
  const hashedPassword = await bcryptjs.hash(password, saltRounds);
  return post(url, { username, password: hashedPassword }).then(
    async (response) => {
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.message);
      }
      return data;
    },
  );
};

export default login;
