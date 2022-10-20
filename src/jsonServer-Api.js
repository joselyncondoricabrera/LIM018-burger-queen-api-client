const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('src/db.json');
const middlewares = jsonServer.defaults();

const secretWaiter = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkdhYnkiLCJyb2xlIjoibWVzZXJvIiwiYWRtaW4iOmZhbHNlfQ.2UVK4iuzQ3MoazqBj27vpf_0uqG1pBXrZH0UAWGA8T0';
const secretChef = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwibmFtZSI6IlJ1YmlzIiwicm9sZSI6ImNoZWYiLCJhZG1pbiI6ZmFsc2V9.G2w6LnhoQu3dhwUBCswCJhUl2cKNFtNxMyUrYK8A4vg';
server.use(jsonServer.bodyParser);

server.use(middlewares);

server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/auth') {
    next();
  } else if (req.headers.authorization === `Bearer ${secretWaiter}` || req.headers.authorization === `Bearer ${secretChef}`) {
    // console.log('autorización correcta');
    // console.log('path put de orders', req.path, req.method);

    if (req.path === '/orders' && req.method === 'POST') {
      if (req.body.products.length === 0 || req.body.userId === undefined) {
        res.status(400).send('Bad request');
      }
    }
    // else if (req.path === `/orders/${req.body.id}` && req.method === 'PUT') {
    //   if (req.body.length === 0) {
    //     console.log('aqui no hay propiedad');
    //     res.status(400);
    //   } else if (req.body.status !== 'delivering' || req.body.status !== 'delivered') {
    //     console.log('status incorrecto');
    //     res.status(400);
    //   }
    //   const orders = router.db.get('orders');
    //   // eslint-disable-next-line no-underscore-dangle
    //   const arrayOrders = orders.__wrapped__.orders;
    //   arrayOrders.forEach((order) => {
    //     if (req.body.id !== order.id) {
    //       console.log('id no encontrado');
    //       res.status(404);
    //     }
    //   });
    // }
    next();
  } else {
    res.sendStatus(401);
  }
});

server.post('/auth', (req, res) => {
  const users = [{
    email: 'mesero1@gmail.com',
    password: '123456',
  },
  {
    email: 'chef1@gmail.com',
    password: '123456',
  },
  ];
  const usersEmail = users.map((user) => user.email);
  const usersPassword = users.map((user) => user.password);

  if (usersEmail.includes(req.body.email)
    && usersPassword.includes(req.body.password)) {
    if (req.body.email === 'mesero1@gmail.com') {
      res.jsonp({
        token: secretWaiter,
      });
      console.log('mesero');
    } else {
      res.jsonp({
        token: secretChef,
      });
      console.log('cocinero');
    }
  } else {
    res.status(400).send('Bad Request');
  }
});

// server.post('/orders', (req, res) => {
//   // DUDA: porque no igualar a array vacío y si a .length 0
//   if (req.body.products.length !== 0 && req.body.userId !== undefined) {
//     // faltaria agregar a la tabla de ordenes

//     res.json({
//       userId: req.body.userId,
//       client: req.body.client,
//       products: req.body.products,
//       status: 'pending',
//     });
//   } else {
//     res.status(400).send('Bad request');
//   }
// });

// router.render = async (req, res) => {
server.post('/orders', async (req, res) => {
  const today = new Date();
  // const now = today.toLocaleString();
  const order = {
    userId: req.body.userId,
    client: req.body.client,
    products: req.body.products,
    status: 'pending',
    dateEntry: today,
  };

  const orders = router.db.get('orders');
  // eslint-disable-next-line no-underscore-dangle
  // console.log(orders.__wrapped__.orders.length);
  // eslint-disable-next-line no-underscore-dangle
  order.id = orders.__wrapped__.orders.length + 1;
  await orders.push(order).write();
  res.status(201).jsonp(order);
});

server.put('/orders/:id', async (req, res) => {
  const orders = router.db.get();
  // eslint-disable-next-line no-underscore-dangle
  const arrayOrders = orders.__wrapped__.orders;

  arrayOrders.forEach(async (order) => {
    if (req.body.id !== order.id) {
      res.status(404);
    }
  });
  const ordersModified = arrayOrders.map((e) => {
    if (req.body.id === e.id) {
      return req.body;
    }
    return e;
  });
  // console.log(ordersModified);
  // eslint-disable-next-line no-underscore-dangle
  orders.__wrapped__.orders.length = 0;
  // eslint-disable-next-line no-underscore-dangle
  console.log(orders.__wrapped__.orders);
  // eslint-disable-next-line no-underscore-dangle
  // console.log(orders.__wrapped__.orders);
  // eslint-disable-next-line no-underscore-dangle
  orders.__wrapped__.orders.push(ordersModified).write();
  // await Object.assign(orders, ordersModified).write();
  res.status(201).jsonp(req.body);

  if (req.body.length === 0) {
    res.status(400);
  } else if (req.body.status !== 'delivering' || req.body.status !== 'delivered') {
    res.status(400);
  }
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
