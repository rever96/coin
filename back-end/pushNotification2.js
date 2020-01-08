const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const webpush = require('web-push');

const app = express();

const vapidDetails = {
  subject: 'mailto:rever22411@gmail.com',
  publicKey:
    'BAdlD5AG5vjAOgTHSLUiIdan6INo9rY_S_wRYtoaQCYlcOfCJiXL0Z2mCwMOB-5KYKNFIbWTEPiqTCm32Wlj7sk',
  privateKey: 'Hq2oAYj_G57jbCVcFLIJrKTbIuits8vpmz8hR05ZREc'
};

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

webpush.setVapidDetails(
  vapidDetails.subject,
  vapidDetails.publicKey,
  vapidDetails.privateKey
);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/notifications/subscribe', (req, res) => {
  const subscription = req.body;

  console.log(subscription);

  const payload = JSON.stringify({
    title: 'Hello!',
    body: 'It works.'
  });

  webpush
    .sendNotification(subscription, payload)
    .then(result => console.log(result))
    .catch(e => console.log(e.stack));

  res.status(200).json({ success: true });
});

app.listen(9000, () =>
  console.log('The server has been started on the port 9000')
);
