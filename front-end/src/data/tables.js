import {
  fetchTablePending,
  fetchTableSuccess,
  fetchTableError
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
      cr.fk_orario = { value: r.fk_orario, rifTable: 'settimane' };
    }
    if (cr.fk_proprietario) {
      cr.fk_proprietario = { value: r.fk_proprietario, rifTable: 'persone' };
    }
    return cr;
  });
  return [...rows];
}
