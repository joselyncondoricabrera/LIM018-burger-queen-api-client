const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const secret = 'EsUnSecreto';

server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/auth') {
    next();
  } else if (req.headers.authorization === `Bearer ${secret}`) {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.post('/auth', (req, res) => {
  // server.get('/users', (requ, resp) => {
  //   resp.jsonp(requ.query);
  // });
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
    // eslint-disable-next-line no-undef
    res.jsonp({
      token: secret,
    });
  } else {
    res.status(400).send('Bad Request');
  }
});

// server.use((req, res, next) => {
//   if (req.method === 'POST' && req.path === '/orders') {
//     next();
//   } else if (req.headers.authorization === `Bearer ${secret}`) {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// });

// server.post('/orders', (req, res) => {
//   if (req.body.userId !== null && req.body.client !== null) {
//     res.jsonp({
//       'orders.userId': req.body.userId,
//       'orders.client': req.body.client,
//     });
//   } else if (req.headers.authorization === null) {
//     res.status(401).send('No authorization');
//   }
// });

server.use((req, res, next) => {
  if (req.method === 'GET' && req.path === '/products') {
    next();
  } else if (req.headers.authorization === `Bearer ${secret}`) {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.get('/products', (req, res) => {
  if (req.headers.authorization === `Bearer ${secret}`) {
    res.jsonp(req.query);
  } else {
    res.sendStatus(401);
  }
});
server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
