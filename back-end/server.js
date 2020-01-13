//Install express server
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const webpush = require('web-push');

const Struttura = require('./controllers/Struttura');
const Dati = require('./controllers/Dati');

const vapidDetails = {
  subject: 'mailto:rever22411@gmail.com',
  publicKey:
    'BAdlD5AG5vjAOgTHSLUiIdan6INo9rY_S_wRYtoaQCYlcOfCJiXL0Z2mCwMOB-5KYKNFIbWTEPiqTCm32Wlj7sk',
  privateKey: 'Hq2oAYj_G57jbCVcFLIJrKTbIuits8vpmz8hR05ZREc'
};
const googleCloudMessagingAPIKey = 'AIzaSyClVmd_jkID2oDKdG4XV6bbeFAxndP2QrQ';
webpush.setGCMAPIKey(googleCloudMessagingAPIKey);
webpush.setVapidDetails(
  vapidDetails.subject,
  vapidDetails.publicKey,
  vapidDetails.privateKey
);

let listOfSubcriptions = [];

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

app.get('/', (req, res) => {
  res.send('Lista di subscriptions:' + JSON.stringify(listOfSubcriptions));
});

app.post('/prova', (req, res) => {
  console.log('provato');
  console.log(req.body);
});

app.post('/notifications/subscribe', (req, res) => {
  const subscription = req.body;

  if (listOfSubcriptions.every(s => s.endpoint !== subscription.endpoint)) {
    listOfSubcriptions.push(subscription);
    res.status(200).json({ 'nuova subscription': subscription });
  } else {
    res.status(200).json({ 'vecchia subscription': subscription });
  }
});
app.post('/api/notify', (req, res) => {
  const payload = JSON.stringify({
    title: 'Hello!',
    body: 'It works.'
  });
  listOfSubcriptions.forEach(subscription => {
    webpush
      .sendNotification(subscription, payload)
      .then(result => console.log(result))
      .catch(e => console.log(e.stack));
  });
  res.status(200).json({});
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

app.listen(process.env.PORT || 8080, () => {
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
