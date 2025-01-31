// LOGIN
// Función para autenticación de usuario
// https://bqapi.fakel.lol/
// admin1@gmail.com
// contraseña
// apasswordtochange

export const loginUsers = (email, password) => {
  const bodyData = {
    email,
    password,
  };
  return fetch('http://localhost:3001/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData),
  })
    // eslint-disable-next-line consistent-return
    .then((resp) => {
      if (resp.status === 200) { return resp.json(); }
    });
};

// MENU
// Guardar orden
export const postOrders = (token, orderData) => fetch('http://localhost:3001/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(orderData),
}).then((res) => res.json());

// Obtener productos del db
export const getProducts = (tokens) => fetch('http://localhost:3001/products', {
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${tokens}`,
  },
})
  .then((res) => res.json())
  .catch((e) => console.log(e));
// return 'true';

// ORDERS
// Función para obtener ordenes
export const getOrders = (token) => fetch('http://localhost:3001/orders', {
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
}).then((resp) => resp.json());

// Función para actualizar ordenes
export const updateOrders = (order, token, orderBodyUpdate) => fetch(`http://localhost:3001/orders/${order.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(orderBodyUpdate),
});

// ADMIN

// Función para guardar usuarios
export const postUsers = (token, usersBody) => fetch('http://localhost:3001/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(usersBody),
}).then((res) => res.json());

// Función para obtener usuarios
export const getUsers = (token) => fetch('http://localhost:3001/users', {
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());

// función para guardar productos
export const postProducts = (token, productBody) => fetch('http://localhost:3001/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(productBody),
}).then((res) => res.json());

// función para modificar producto
export const putProducts = (productId, token, productBody) => fetch(`http://localhost:3001/products/${productId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(productBody),
}).then((res) => res.json());

// https://bqapi.fakel.lol/users

// Función para actualizar ususarios
export const updateUsers = (userSelection, token, usersBodyUpdate) => fetch(`http://localhost:3001/users/${userSelection}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(usersBodyUpdate),
}).then((resp) => resp.json());

// Función para eliminar un usuario
export const deleteUser = (userSelection, token) => fetch(`http://localhost:3001/users/${userSelection}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
});
