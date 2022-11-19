/* eslint-disable consistent-return */
export default function request(chapter, method, data) {
  const url = 'https://chatserver0.herokuapp.com';

  if (method === 'GET') {
    return fetch(`${url}?${data}`);
  } if (method !== 'GET') {
    return fetch(url + chapter, {
      method,
      body: data,
    });
  }
}
