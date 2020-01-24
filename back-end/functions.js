const request = require('request');
const moment = require('moment');

const serverPath = 'https://coin-backend.herokuapp.com/';
//const serverPath = 'http://localhost:8080/';

const startPushNotifications = function() {
  var millisTillMidNight = moment()
    .hours(23)
    .minutes(30)
    .milliseconds(0)
    .subtract(moment().valueOf(), 'milliseconds')
    .valueOf();
  setTimeout(function() {
    checkEvents();
    setInterval(checkEvents, 24 * 3600 * 1000);
  }, millisTillMidNight);

  //TEST
  // setTimeout(function() {
  //   checkEvents();
  //   setInterval(checkEvents, 60 * 1000);
  // }, 1000);
};

const checkEvents = () => {
  console.log('check events');
  const today = moment()
    .add(1, 'days')
    .hours(0)
    .minutes(0);
  const tomorrow = moment()
    .add(2, 'days')
    .hours(0)
    .minutes(0);
  request.post(
    {
      headers: { 'content-type': 'application/json' },
      url: serverPath + 'api/v3/select',
      body: JSON.stringify({ table: 'eventi' })
    },
    function(error, response, body) {
      body = JSON.parse(body);
      body.forEach(evento => {
        const data = moment(evento.data_inizio);
        if (data > today && data < tomorrow) {
          sendNotification(evento.titolo);
          setTimeout(
            sendNotification,
            calcMinutesLeft(data, 20),
            evento.titolo
          );
        }
      });
    }
  );
  request.post(
    {
      headers: { 'content-type': 'application/json' },
      url: serverPath + 'api/v3/select',
      body: JSON.stringify({ table: 'ordini' })
    },
    function(error, response, body) {
      const tabella = JSON.parse(body);
      tabella.forEach(ordine => {
        const data = moment(ordine.data_prevista_consegna);
        if (data > today && data < tomorrow) {
          request.post(
            {
              headers: { 'content-type': 'application/json' },
              url: serverPath + 'api/v3/select',
              body: JSON.stringify({
                table: 'clienti',
                filters: [{ col: 'id', data: ordine.fk_cliente }]
              })
            },
            function(error, response, body) {
              const tabella = JSON.parse(body);
              const titolo = 'Ordine di ' + tabella[0].intestazione_legale;
              sendNotification(titolo);
              setTimeout(sendNotification, calcMinutesLeft(data, 20), titolo);
            }
          );
        }
      });
    }
  );
};

const sendNotification = title => {
  request.post(
    {
      headers: { 'content-type': 'application/json' },
      url: serverPath + 'api/notify',
      body: JSON.stringify({ title, content: 'mario' })
    },
    function(error, response, body) {
      console.log(body);
    }
  );
};

const calcMinutesLeft = (data, offset) => {
  return data
    .subtract(
      moment()
        .add(offset, 'minutes')
        .valueOf(),
      'milliseconds'
    )
    .valueOf();
};

exports.startPushNotifications = startPushNotifications;
