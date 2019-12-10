import {
  FETCH_DATA_PENDING,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  RESET_DATA,
  UPDATE_DATA,
  CREATE_DATA,
  DELETE_DATA
} from './actions';

const initialState = {
  pending: false,
  tableData: {},
  fetchedTables: [],
  error: null
};

export const tablesReducer = (state = initialState, action) => {
  let refRow, refTable;
  switch (action.type) {
    case RESET_DATA:
      return initialState;
    case FETCH_DATA_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        pending: false,
        fetchedTables: [...state.fetchedTables, action.tableName],
        tableData: {
          ...state.tableData,
          [action.tableName]: action.tableData
        }
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case UPDATE_DATA:
      refRow = state.tableData[action.tableName].find(
        row => row.id === action.id
      );
      action.row.forEach(newRow => {
        refRow[newRow.col] = newRow.data;
      });
      return {
        ...state
      };
    case CREATE_DATA:
      refTable = state.tableData[action.tableName];
      refTable.push({ id: action.id, ...action.row });
      console.log(refTable);
      return {
        ...state
      };
    case DELETE_DATA:
      refTable = state.tableData[action.tableName];
      refTable.splice(
        refTable.findIndex(row => row.id === action.id),
        1
      );
      console.log(refTable);
      return {
        ...state
      };
    default:
      return state;
  }
};
