export const FETCH_DATA_PENDING = 'wait for db';
export const FETCH_DATA_SUCCESS = 'db fetch success';
export const FETCH_DATA_ERROR = 'db fetch error';

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
