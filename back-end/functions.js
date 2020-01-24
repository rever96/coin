const request = require('request');
const moment = require('moment');

const startPushNotifications = function() {
  var millisTillMidNight = moment()
    .hours(23)
    .minutes(59)
    .milliseconds(0)
    .subtract(moment().valueOf(), 'milliseconds')
    .valueOf();
  setTimeout(function() {
    checkEvents();
    setInterval(checkEvents, 24 * 3600 * 1000);
  }, millisTillMidNight);

  //TEST
  setTimeout(function() {
    checkEvents();
    setInterval(checkEvents, 20 * 1000);
  }, 1000);
};

const checkEvents = () => {
  console.log('check events');
  const today = moment();
  const tomorrow = moment().add(1, 'days');
  request.post(
    {
      headers: { 'content-type': 'application/json' },
      url: 'http://localhost:8080/api/v3/select',
      body: JSON.stringify({ table: 'eventi' })
    },
    function(error, response, body) {
      console.log(body);
      body = JSON.parse(body);
      body.forEach(evento => {
        const data = moment(evento.data_inizio);
        if (data > today && data < tomorrow) {
          sendNotification(evento.titolo);
          setTimeout(sendNotification, 1000, evento.titolo);
        }
      });
    }
  );
  sendNotification();
};

const sendNotification = title => {
  request.post(
    {
      headers: { 'content-type': 'application/json' },
      url: 'http://localhost:8080/api/notify',
      body: JSON.stringify({ title, content: 'mario' })
    },
    function(error, response, body) {
      console.log(body);
    }
  );
};

exports.startPushNotifications = startPushNotifications;
