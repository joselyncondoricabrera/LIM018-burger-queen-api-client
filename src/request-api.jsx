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
  } else if (req.method === 'GET' && req.path === '/products') {
    next();
  } else if (req.headers.authorization === `Bearer ${secret}`) {
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

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
