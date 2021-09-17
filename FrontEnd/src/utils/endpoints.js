import { baseUrl, urls } from './constants';
import post from './request';

const login = (username, password) => {
  const url = `${baseUrl}${urls.login}`;
  return post(url, { username, password }).then(async (response) => {
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  });
};

export default login;
