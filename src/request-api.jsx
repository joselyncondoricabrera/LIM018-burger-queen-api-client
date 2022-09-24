const fetch = require('node-fetch');

const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const secret = 'EsUnSecreto';
function getUsers() {
  return new Promise((resolve) => {
    fetch('http://localhost:3001/users')
      .then((result) => result.json())
      .then((data) => {
        const usersEmail = data.map((userObject) => ({
          email: userObject.email,
          password: userObject.password,
        }));
        resolve(usersEmail);
      });
  });
}

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
// let email = '';
// let pass = '';
let result;
server.post('/auth', (req, res) => {
  // email = req.body.email;
  // pass = req.body.password;

  getUsers()
    .then((user) => {
      user.forEach((e) => {
        // console.log(e.email);
        if (e.email === req.body.email && e.password === req.body.password) {
          console.log('son iguales');
          result = true;
        }
      });
    });
  if (result === true) {
    res.jsonp({
      token: secret,
    });
  } else if (result === false) {
    res.status(400).send('Bad Request');
  }
  // if (
  //   req.body.email === 'iam@fakel.lol'
  //   && req.body.password === 'apasswordtochange') {
  //   res.jsonp({
  //     token: secret,
  //   });
  // }
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
