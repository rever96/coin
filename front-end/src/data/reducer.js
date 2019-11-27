import {
  FETCH_DATA_PENDING,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  RESET_DATA
} from './actions';

const initialState = {
  pending: false,
  tableData: {},
  fetchedTables: [],
  error: null
};

export const tablesReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};
