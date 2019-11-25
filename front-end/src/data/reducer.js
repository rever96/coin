import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from './actions';

export const reduceConfig = (state = [], action) => {
  switch (action.type) {
    case 'GET':
      const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: action.tableName })
      };
      fetch('http://localhost:8080/api/v3/select', options)
        .then(response => response.json())
        .then(data => {
          return [
            ...state,
            {
              tableName: action.tableName,
              tableData: data
            }
          ];
        });
      break;
    case 'INIT':
      return [];
    default:
      return state;
  }
};

const initialState = {
  pending: false,
  products: [],
  error: null
};

export function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        pending: false,
        products: action.payload
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}
