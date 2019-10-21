//Install express server
const express = require('express');
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg');
// const client = new Client();
// client.connect();
// const sql = `SELECT 1 AS "\\'/*", 2 AS "\\'*/\n + console.log(process.env)] = null;\n//"`;
// client.query(sql, (err, res) => {
//   client.end();
// });
const pool = new Pool({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211
});
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});
const client = new Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211
});
client.connect();
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
});
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
