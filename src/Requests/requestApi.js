// LOGIN
// Función para autenticación de usuario
export const loginUsers = (email, password) => {
  const bodyData = {
    email,
    password,
  };
  return fetch('http://localhost:3001/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData),
  });
};

// MENU

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
