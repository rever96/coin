import {
  fetchTablePending,
  fetchTableSuccess,
  fetchTableError,
  actionUpdateTableRow,
  actionCreateTableRow,
  actionDeleteTableRow
} from './actions';
import { serverPath } from '../environment';

export const TABLENAME = {
  CLIENTI: 'clienti',
  VEICOLI: 'veicoli',
  PERSONE: 'persone',
  SETTIMANE: 'settimane'
};

export function fetchTable(tableName, dispatch) {
  console.log('fetch server table');
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table: tableName })
  };

  dispatch(fetchTablePending());
  fetch(serverPath + 'api/v3/select', options)
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
    fetchTable(tableName, dispatch);
  }
}

export function updateTableRow(dispatch, tableName, id, row) {
  console.log('update local table + server table');
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
    fetch(serverPath + 'api/v3/update', options)
      .then(response => response.json())
      .then(() => {
        dispatch(actionUpdateTableRow(tableName, values, id));
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function createTableRow(dispatch, tableName, row) {
  console.log('add row local table + server table');
  console.log(row);
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
        values
      })
    };
    fetch(serverPath + 'api/v3/create', options)
      .then(response => response.json())
      .then(res => {
        if (res.name && res.name === 'error') {
          const a = [];
          for (const key in res) {
            a.push(key + ': ' + res[key]);
          }
          reject(a);
        }
        dispatch(actionCreateTableRow(tableName, row, res));
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function deleteTableRow(dispatch, tableName, id) {
  console.log('delete row local table + server table');
  return new Promise((resolve, reject) => {
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        table: tableName,
        id
      })
    };
    fetch(serverPath + 'api/v3/delete', options)
      .then(response => response.json())
      .then(res => {
        if (res.name && res.name === 'error') {
          const a = [];
          for (const key in res) {
            a.push(key + ': ' + res[key]);
          }
          reject(a);
        }
        dispatch(actionDeleteTableRow(tableName, id));
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
  console.log('set local rows (codice pericolante)');
  if (!tableData || tableData.lenght <= 0) {
    return [];
  }
  const rows = tableData.map((r, key) => {
    let cr = { ...r };
    cr.key = key;
    if (cr.indirizzo || cr.indirizzo === '') {
      cr.indirizzo = {
        id: r.id,
        name: r.indirizzo,
        value: r.gmap,
        columnLink: 'gmap',
        columnAddress: 'indirizzo'
      };
    }
    if (cr.fk_orario || cr.fk_orario === '') {
      cr.fk_orario = {
        id: r.id,
        value: r.fk_orario,
        rifTable: 'settimane',
        rifColumn: 'fk_orario'
      };
    }
    if (cr.fk_proprietario || cr.fk_proprietario === '') {
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
