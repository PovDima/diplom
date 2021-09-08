import axios from '../../utils/axios'

export const GET_OFFERS_SUCCESS = "GET_OFFERS_SUCCESS";

export const getStatements = (data) => async (dispatch) => {
  const { search, sortField, sortOrder } = data;
  let query = '';

  if (sortField) {
    query += '&sortField=' + sortField + '&sortOrder=' + sortOrder;
  }

  if (search) {
    query += '&search=' + encodeURIComponent(search);
  }

  const res = await axios.get(`/statements?${query}`)

  dispatch({
    type: GET_OFFERS_SUCCESS,
    statements: res.data.statements,
  })
}
