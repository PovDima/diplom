import axios from '../../utils/axios'

export const GET_STATEMENTS_SUCCESS = "GET_STATEMENTS_SUCCESS";
export const DELETE_STATEMENTS_SUCCESS = "DELETE_STATEMENTS_SUCCESS";
export const UPDATE_STATEMENTS_SUCCESS = "UPDATE_STATEMENTS_SUCCESS";
export const CREATE_STATEMENTS_SUCCESS = "CREATE_STATEMENTS_SUCCESS";
export const GET_STATEMENT_SUCCESS = 'GET_STATEMENT_SUCCESS'
export const START_ALGORYTHM_SUCCESS = 'START_ALGORYTHM_SUCCESS'

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
    type: GET_STATEMENTS_SUCCESS,
    statements: res.data.statements,
  })
}

export const getStatement = (statementId) => async (dispatch) => {
  const res = await axios.get(`/statements/${statementId}`)
  dispatch({ type: GET_STATEMENT_SUCCESS, statement: res.data.statement })
  return res.data.statement
}

export const deleteStatement = (statementId) => async (dispatch) => {
  await axios.delete(`/statements/${statementId}`)
  dispatch({ type: DELETE_STATEMENTS_SUCCESS })
}

export const updateStatement = (statementId, data) => async (dispatch) => {
  await axios.put(`/statements/${statementId}`, data)
  dispatch({ type: UPDATE_STATEMENTS_SUCCESS })
}

export const createStatement = (data) => async (dispatch) => {
  await axios.post(`/statements`, data)
  dispatch({ type: CREATE_STATEMENTS_SUCCESS })
}

export const startAlgorithm = () => async (dispatch) => {
  const res = await axios.post(`/statements/algorithm`)
  dispatch({ type: START_ALGORYTHM_SUCCESS })
  return res.data
}

