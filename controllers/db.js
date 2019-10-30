const { Pool } = require('pg');
const notAClient = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gestionaleRapio',
  password: 'kaminari',
  port: 5432
});

exports.query = function(text, params) {
  return new Promise((resolve, reject) => {
    notAClient
      .query(text, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
