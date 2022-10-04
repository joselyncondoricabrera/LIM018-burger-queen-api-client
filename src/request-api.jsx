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
//   if (req.body.userId !== undefined) {
//     res.json({
//       userId: req.body.userId,
//       client: req.body.client,
//     });
//   } else {
//     res.status(400).send('Bad Request');
//   }
// });

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
