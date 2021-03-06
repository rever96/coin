const db = require('./db');
const uuidv4 = require('uuid/v4');

// {table: 'eventi', filters: [{col: 'id', data: '00'}]}
exports.select = async function(req, res) {
  let query = `SELECT * FROM ` + req.body.table;
  if (req.body.filters) {
    query = req.body.filters.reduce(
      (acc, v) => acc + v.col + ` = '` + v.data + `' AND `,
      query + ` WHERE `
    );
    query = query.substring(0, query.length - 4);
  }
  try {
    await db.query(query).then(result => {
      return res.status(201).json(result.rows);
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.update = async function(req, res) {
  const { table, values, condition } = req.body;
  let setVal;
  if (values.length > 1) {
    const first = values.splice(0, 1)[0];
    setVal = values.reduce(
      (acc, v) => acc + `, ` + v.col + ` = '` + v.data + `'`,
      first.col + ` = '` + first.data + `'`
    );
  } else {
    setVal = values[0].col + ` = '` + values[0].data + `'`;
  }

  const query =
    `UPDATE ` + table + ` SET ` + setVal + ` WHERE ` + condition + `;`;
  console.log(query);
  try {
    await db.query(query).then(result => {
      return res.status(201).json(result.rows);
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.create = async function(req, res) {
  const { table, values } = req.body;
  const columns = values.reduce((acc, cur) => acc + `, ` + cur.col, `(id`);
  const row = values.reduce((acc, cur) => acc + `, '` + cur.data + `'`, `'`);
  const id = uuidv4();
  const query =
    `INSERT INTO ` + table + columns + `) VALUES('` + id + row + `);`;
  console.log(query);
  try {
    await db.query(query).then(() => {
      return res.status(201).json(id);
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.delete = async function(req, res) {
  const { table, id } = req.body;
  const query = `DELETE FROM ` + table + ` WHERE id='` + id + `';`;
  console.log(query);
  try {
    await db.query(query).then(() => {
      console.log('succcess');
      return res.status(201).json({ message: 'deleted' });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
