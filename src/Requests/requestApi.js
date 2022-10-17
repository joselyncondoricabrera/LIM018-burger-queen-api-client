// import fetch from 'node-fetch';

// eslint-disable-next-line import/prefer-default-export
function loginUsers(email, password) {
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

function updateOrders(token) {
  return fetch('http://localhost:3001/orders', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json());
}

export { loginUsers, updateOrders };
