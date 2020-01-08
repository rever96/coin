//Install express server
const express = require('express');
const bodyParser = require('body-parser');

const Struttura = require('./controllers/Struttura');
const Dati = require('./controllers/Dati');

const PushModule = require('./pushNotification');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});
app.use(bodyParser.json());

app.post('/prova', (req, res) => {
  console.log('provato');
  console.log(req.body);
});

// ENDPOINT CONTROLLERS DB

// app.post('/api/v1/reflections', Auth.verifyToken, Reflection.create);
// app.get('/api/v1/reflections', Reflection.getAll);
// app.get('/api/v1/reflections/:id', Auth.verifyToken, Reflection.getOne);
// app.put('/api/v1/reflections/:id', Auth.verifyToken, Reflection.update);
// app.delete('/api/v1/reflections/:id', Auth.verifyToken, Reflection.delete);
// app.get('/api/v1/users', UserWithDb.getAll);
// app.post('/api/v1/users', UserWithDb.create);
// app.post('/api/v1/move', UserWithDb.moveOwnership);
// app.post('/api/v1/users/login', UserWithDb.login);
// app.delete('/api/v1/users/me', Auth.verifyToken, UserWithDb.delete);

app.post('/api/v2/createDB', Struttura.create);
app.post('/api/v2/alterDB', Struttura.alter);
app.post('/api/v3/select', Dati.select);
app.post('/api/v3/update', Dati.update);
app.post('/api/v3/create', Dati.create);
app.post('/api/v3/delete', Dati.delete);
app.post('/api/v4/push', PushModule.push);

app.listen(8080, () => {
  console.log('online');
});

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
// const stripeKeyPublic = 'pk_test_rF1OyNuizo6EhmqMHcWpDBGd00LhGH7BDi';
// const stripeKeyPrivate = 'sk_test_LSVOpfM5vkb9ePoIDkjRKpdl00dGeypAfp';

// const stripe = require('stripe')(stripeKeyPrivate);

// (async () => {
//   console.log(
//     'creazione api che rappresenta il servizio che si vuole offrire al cliente'
//   );
//   const product = await stripe.products.create({
//     name: 'My SaaS Platform',
//     type: 'service'
//   });
// })();

// (async () => {
//   console.log('crea un piano relativo al prodotto specificato');
//   const plan = await stripe.plans
//     .create({
//       product: 'prod_G21IvcIuBSYAdu',
//       nickname: 'SaaS Platform USD',
//       currency: 'eur',
//       interval: 'year',
//       amount: 100
//     })
//     .then(obj => console.log(obj));
// })();
