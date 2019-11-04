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

exports.query = async function(req, res) {
  const query = `SELECT
  ordini."id", ordini.data_ordine, clienti.intestazione_legale, vendite.importo, veicoli.targa
  FROM
  vendite, ordini, clienti, veicoli, ddv
  WHERE vendite.fk_ordine = ordini."id"
  AND clienti."id"=ordini.fk_cliente AND veicoli."id" = DDV.fk_veicolo`;
  try {
    await db.query(query).then(result => {
      return res.status(201).json(result.rows);
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};
