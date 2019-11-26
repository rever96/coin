export const FETCH_DATA_PENDING = 'ACTION1';
export const FETCH_DATA_SUCCESS = 'ACTION2';
export const FETCH_DATA_ERROR = 'ACTION3';

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
