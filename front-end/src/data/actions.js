export const FETCH_DATA_PENDING = 'wait for db';
export const FETCH_DATA_SUCCESS = 'db fetch success';
export const FETCH_DATA_ERROR = 'db fetch error';
export const RESET_DATA = 'copia locale db eliminata';
export const UPDATE_DATA = 'aggiorno t-upla';
export const CREATE_DATA = 'aggiungo t-upla';
export const DELETE_DATA = 'elimino t-upla';

export function resetTables() {
  return { type: RESET_DATA };
}

export function fetchTablePending() {
  return {
    type: FETCH_DATA_PENDING
  };
}

export function fetchTableSuccess(tableData, tableName) {
  return {
    type: FETCH_DATA_SUCCESS,
    tableData,
    tableName
  };
}

export function fetchTableError(error) {
  return {
    type: FETCH_DATA_ERROR,
    error: error
  };
}

export function actionUpdateTableRow(tableName, row, id) {
  return {
    type: UPDATE_DATA,
    tableName,
    id,
    row
  };
}

export function actionCreateTableRow(tableName, row, id) {
  return {
    type: CREATE_DATA,
    tableName,
    id,
    row
  };
}

export function actionDeleteTableRow(tableName, id) {
  return {
    type: DELETE_DATA,
    tableName,
    id
  };
}
