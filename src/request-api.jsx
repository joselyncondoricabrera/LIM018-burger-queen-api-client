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
// getUsers().then((resp) => {
//   resp.map((result) => console.log(result.email));
//   resp.map((result) => console.log(result.password));
// });

server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use((req, res, next) => {
  // console.log(req.headers);

  if (req.method === 'POST' && req.path === '/auth') {
    next();
  } else if (req.headers.authorization === `Bearer ${secret}`) {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.post('/auth', (req, res) => {
  getUsers().then((resp) => {
    // console.log(resp[i].email);
    if (
      req.body.email === resp.email
      && req.body.password === resp.password) {
      // console.log('ingresó');
      res.jsonp({
        token: secret,
      });
    } else res.status(400).send('Bad Request');
  });
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
