import fetch from 'node-fetch';

export default function loginUsers(email, password) {
  const bodyData = {
    email,
    password,
  };
  return fetch('http://localhost:3001/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData),
  });
}
