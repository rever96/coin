import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError
} from './actions';

function fetchProducts(tableName, dispatch) {
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table: tableName })
  };

  dispatch(fetchProductsPending());
  fetch('http://localhost:8080/api/v3/select', options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      dispatch(fetchProductsSuccess(data));
      return data;
    })
    .catch(error => {
      dispatch(fetchProductsError(error));
    });
}

export default fetchProducts;
