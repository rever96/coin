const db = require('./db');

exports.select = async function(req, res) {
  const query = `SELECT * FROM ` + req.body.table;
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
