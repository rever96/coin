//Install express server
const express = require('express');
const bodyParser = require('body-parser');
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
