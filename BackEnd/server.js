//Install express server
const express = require('express');
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg');

const Reflection = require('./controllers/Reflections');
const UserWithDb = require('./controllers/User');
const Auth = require('./controllers/Auth');

const Struttura = require('./controllers/Struttura');
const Dati = require('./controllers/Dati');

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
const client = new Client({
  user: 'root',
  host: 'db-rapio-coin.cvxuglljpzf9.us-east-1.rds.amazonaws.com',
  database: 'coindb',
  password: 'msnzkfhE0rm9OqqF4anB',
  port: 5432
});

// // SELECT
// client.connect();
// client.query('select * from account;', (err, res) => {
//   console.log(err, res);
//   client.end();
// });

// CREATE TABLE
// const queryText = `CREATE TABLE IF NOT EXISTS
//       users(
//         id UUID PRIMARY KEY,
//         email VARCHAR(128) UNIQUE NOT NULL,
//         password VARCHAR(128) NOT NULL,
//         created_date TIMESTAMP,
//         modified_date TIMESTAMP
//       )`;
// const queryText = `CREATE TABLE IF NOT EXISTS
//       reflections(
//         id UUID PRIMARY KEY,
//         success TEXT NOT NULL,
//         low_point TEXT NOT NULL,
//         take_away TEXT NOT NULL,
//         owner_id UUID NOT NULL,
//         created_date TIMESTAMP,
//         modified_date TIMESTAMP,
//         FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
//       )`;
// client.connect();
// client
//   .query(queryText)
//   .then(res => {
//     console.log(res);
//     client.end();
//   })
//   .catch(err => {
//     console.log(err);
//     client.end();
//   });

// END

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

app.post('/api/v1/reflections', Auth.verifyToken, Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Auth.verifyToken, Reflection.getOne);
app.put('/api/v1/reflections/:id', Auth.verifyToken, Reflection.update);
app.delete('/api/v1/reflections/:id', Auth.verifyToken, Reflection.delete);
app.get('/api/v1/users', UserWithDb.getAll);
app.post('/api/v1/users', UserWithDb.create);
app.post('/api/v1/move', UserWithDb.moveOwnership);
app.post('/api/v1/users/login', UserWithDb.login);
app.delete('/api/v1/users/me', Auth.verifyToken, UserWithDb.delete);

app.post('/api/v2/createDB', Struttura.create);
app.post('/api/v2/alterDB', Struttura.alter);
app.post('/api/v3/select', Dati.select);
app.get('/api/v3/query', Dati.query);

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
