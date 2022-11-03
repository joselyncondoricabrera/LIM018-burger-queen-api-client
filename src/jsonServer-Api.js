/* eslint-disable no-underscore-dangle */
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('src/db.json');
const middlewares = jsonServer.defaults();

const secretWaiter = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkdhYnkiLCJyb2xlIjoibWVzZXJvIiwiYWRtaW4iOmZhbHNlfQ.2UVK4iuzQ3MoazqBj27vpf_0uqG1pBXrZH0UAWGA8T0';
const secretChef = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwibmFtZSI6IlJ1YmlzIiwicm9sZSI6ImNoZWYiLCJhZG1pbiI6ZmFsc2V9.G2w6LnhoQu3dhwUBCswCJhUl2cKNFtNxMyUrYK8A4vg';
const secretAdmin1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzIiwibmFtZSI6Ikxpc2V0aCIsInJvbGUiOiJhZG1pbiIsImFkbWluIjp0cnVlfQ.BHTDaFfg0n4e_99-BdPfudnwlVXI4hIgtLLPq_jfH4c';
const secretAdmin2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzIiwibmFtZSI6IkxpemV0aCIsInJvbGUiOiJtZXNlcmEiLCJhZG1pbiI6dHJ1ZX0.GE7J862HvAKx5Xuo8jpy2igRASM3DgsiimSyqfr_v9k';
server.use(jsonServer.bodyParser);

server.use(middlewares);

server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/auth') {
    next();
  } else if (req.headers.authorization === `Bearer ${secretWaiter}` || req.headers.authorization === `Bearer ${secretChef}` || req.headers.authorization === `Bearer ${secretAdmin1}` || req.headers.authorization === `Bearer ${secretAdmin2}`) {
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
    email: 'chef1@gmail.com',
    password: '123456',
  },
  {
    email: 'liseth.lira.123@gmail.com',
    password: '123456',
  },
  {
    email: 'admin@gmail.com',
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
    } else if (req.body.email === 'chef1@gmail.com') {
      res.jsonp({
        token: secretChef,
      });
      console.log('cocinero');
    } else if (req.body.email === 'admin@gmail.com') {
      res.jsonp({
        token: secretAdmin2,
      });
      console.log('admin2');
    } else {
      res.jsonp({
        token: secretAdmin1,
      });
      console.log('admin1');
    }
  } else {
    res.status(400).send('Bad Request');
  }
});

server.post('/orders', async (req, res) => {
  const today = new Date();
  const order = {
    userId: req.body.userId,
    client: req.body.client,
    products: req.body.products,
    status: 'pending',
    dateEntry: today,
  };
  const orders = router.db.get('orders');
  // eslint-disable-next-line no-underscore-dangle
  order.id = orders.__wrapped__.orders.length + 1;
  await orders.push(order).write();
  res.status(201).jsonp(order);
});

server.post('/products', (req, res) => {
  if (req.body.name === '' || req.body.price === 0) {
    res.status(400).send('Name or price is null');
    return;
  }

  const products = router.db.get('products');
  // eslint-disable-next-line no-underscore-dangle
  const productId = products.__wrapped__.products.length + 1;
  const product = {
    id: productId.toString(),
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    type: req.body.type,
    dateEntry: req.body.dateEntry,
  };
  products.push(product).write();
  res.status(201).jsonp(product);
});

server.put('/orders/:id', async (req, res) => {
  const orderUpdate = {
    userId: req.body.userId,
    client: req.body.client,
    products: req.body.products,
    status: req.body.status,
    dateEntry: req.body.dateEntry,
    id: req.body.id,
  };
  if (req.body.status !== 'delivering' && req.body.status !== 'delivered') {
    res.status(400).send('Status No Valid');
    return;
  }
  const orders = router.db.get('orders');
  // eslint-disable-next-line no-underscore-dangle
  const objId = orders.__wrapped__.orders.find((e) => parseInt(req.params.id, 10) === e.id);
  console.log(objId);
  console.log(req.params.id);

  if (objId === undefined) {
    res.status(404).send('Not Found');
    console.log('entro en 404');
    return;
  }
  // eslint-disable-next-line no-underscore-dangle
  orders.__wrapped__.orders.splice(req.body.id - 1, 1, orderUpdate);
  await orders.write();
  res.status(200).jsonp(orderUpdate);
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
