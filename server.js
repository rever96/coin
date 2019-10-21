//Install express server
const express = require('express');
const bodyParser = require('body-parser');
// const { Pool, Client } = require('pg');
// const client = new Client();
// client.connect();
// const sql = `SELECT 1 AS "\\'/*", 2 AS "\\'*/\n + console.log(process.env)] = null;\n//"`;
// client.query(sql, (err, res) => {
//   client.end();
// });
// const pool = new Pool({
//   user: 'dbuser',
//   host: 'database.server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 3211
// });
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });
// const client = new Client({
//   user: 'dbuser',
//   host: 'database.server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 3211
// });
// client.connect();
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// });
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

app.listen(8080, () => {
  console.log('online');
});

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripeKeyPublic = 'pk_test_rF1OyNuizo6EhmqMHcWpDBGd00LhGH7BDi';
const stripeKeyPrivate = 'sk_test_LSVOpfM5vkb9ePoIDkjRKpdl00dGeypAfp';

const stripe = require('stripe')(stripeKeyPrivate);

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
