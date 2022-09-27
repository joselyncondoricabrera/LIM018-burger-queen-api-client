// const fetch = require('node-fetch');

const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const secret = 'EsUnSecreto';

// function getUsers() {
//   return new Promise((resolve) => {
//     fetch('http://localhost:3002/users')
//       .then((result) => result.json())
//       .then((data) => {
//         const usersEmail = data.map((userObject) => ({
//           email: userObject.email,
//           password: userObject.password,
//         }));
//         resolve(usersEmail);
//       });
//   });
// }
// getUsers().then((users) => {
// const emailUsers = users.map((user) => user.email);
// users.map((user) => user.password);
// if()
// });

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

// let result;
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
    // console.log(res.json());
    // const obj = {
    //   token: secret,
    // };
    sessionStorage.setItem('token', '123');
  } else {
    res.status(400).send('Bad Request');
  }

  // if (
  //   req.body.email === 'iam@fakel.lol'
  //   && req.body.password === 'apasswordtochange') {
  //   res.jsonp({
  //     token: secret,
  //   });
  // } else {
  //   res.status(400).send('Bad Request');
  // }
  // email = req.body.email;
  // pass = req.body.password;

  // getUsers()
  //   .then((user) => {
  //     user.forEach((e) => {
  //       if (e.email === req.body.email && e.password === req.body.password) {
  //         console.log('son iguales');
  //         result = true;
  //       }
  //     });
  //   });
  // if (result === true) {
  //   res.jsonp({
  //     token: secret,
  //   });
  //   // const userToken = {
  //   //   token: secret,
  //   // };
  //   // console.log(userToken);
  //   res.send(res);
  // } else if (result === false) {
  //   res.status(400).send('Bad Request');
  // }
});
server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
