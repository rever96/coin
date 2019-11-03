const { Pool } = require('pg');
const notAClient = new Pool({
  user: 'root',
  host: 'db-rapio-coin.cvxuglljpzf9.us-east-1.rds.amazonaws.com',
  database: 'coindb',
  password: 'msnzkfhE0rm9OqqF4anB',
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
