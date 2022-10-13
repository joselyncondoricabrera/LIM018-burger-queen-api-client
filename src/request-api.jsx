const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('src/db.json');
const middlewares = jsonServer.defaults();

const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkdhYnkiLCJyb2xlIjoibWVzZXJvIiwiYWRtaW4iOmZhbHNlfQ.2UVK4iuzQ3MoazqBj27vpf_0uqG1pBXrZH0UAWGA8T0';
server.use(jsonServer.bodyParser);

server.use(middlewares);

server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/auth') {
    next();
  } else if (req.headers.authorization === `Bearer ${secret}`) {
    if (req.path === '/orders' && req.method === 'POST') {
      if (req.body.products.length === 0 || req.body.userId === undefined) {
        res.status(400).send('Bad request');
      }
    }

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
    email: 'mesero2@gmail.com',
    password: '123456',
  },
  ];
  const usersEmail = users.map((user) => user.email);
  const usersPassword = users.map((user) => user.password);

  if (usersEmail.includes(req.body.email)
    && usersPassword.includes(req.body.password)) {
    res.jsonp({
      token: secret,
    });
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

server.use(router);

// router.render = async (req, res) => {
server.post('/orders', async (req, res) => {
  if (req.method === 'POST' && req.path === '/orders') {
    const today = new Date();
    const now = today.toLocaleString();
    const order = {
      userId: req.body.userId,
      client: req.body.client,
      products: req.body.products,
      status: 'pending',
      dateEntry: now,
    };

    const orders = router.db.get('orders');
    await orders.push(order).write();
    res.jsonp(order);
  } else {
    res.jsonp(res.locals.data);
  }
});

server.listen(3001, () => {
  console.log('JSON Server is running');
});
