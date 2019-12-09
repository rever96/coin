import {
  fetchTablePending,
  fetchTableSuccess,
  fetchTableError,
  actionUpdateTableRow
} from './actions';

export function fetchTable(tableName, dispatch) {
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table: tableName })
  };

  dispatch(fetchTablePending());
  fetch('http://localhost:8080/api/v3/select', options)
    .then(response => response.json())
    .then(data => {
      dispatch(fetchTableSuccess(data, tableName));
    })
    .catch(error => {
      dispatch(fetchTableError(error));
    });
}

export function fetchTableIfMissing(tableName, dispatch, fetchedTables) {
  if (!fetchedTables || !fetchedTables.find(name => name === tableName)) {
    console.log('fetch server table');
    fetchTable(tableName, dispatch);
  }
}

export function updateTableRow(dispatch, tableName, id, row) {
  return new Promise((resolve, reject) => {
    const values = [];
    for (const key in row) {
      values.push({ col: key, data: row[key] });
    }
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        table: tableName,
        values,
        condition: "id = '" + id + "'"
      })
    };
    fetch('http://localhost:8080/api/v3/update', options)
      .then(response => response.json())
      .then(() => {
        dispatch(actionUpdateTableRow(tableName, values, id));
        resolve();
      })
      .catch(error => {
        console.log(error);
      });
  });
}

export function setTable(tableName, dispatch, data) {
  console.log('set local table');
  dispatch(fetchTableSuccess(data, tableName));
}

// TODO separare logica dal tipo dei dati utilizzando un file di configurazione
export function setRows(tableData) {
  if (!tableData || tableData.lenght <= 0) {
    return [];
  }
  const rows = tableData.map((r, key) => {
    let cr = { ...r };
    cr.key = key;
    if (cr.indirizzo) {
      cr.indirizzo = { name: r.indirizzo, value: r.gmap };
    }
    if (cr.fk_orario) {
      cr.fk_orario = {
        id: r.id,
        value: r.fk_orario,
        rifTable: 'settimane',
        rifColumn: 'fk_orario'
      };
    }
    if (cr.fk_proprietario) {
      cr.fk_proprietario = {
        id: r.id,
        value: r.fk_proprietario,
        rifTable: 'persone',
        rifColumn: 'fk_proprietario'
      };
    }
    return cr;
  });
  return [...rows];
}
