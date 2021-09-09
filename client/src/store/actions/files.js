import axios from '../../utils/axios'

export const GET_FILE_SUCCESS = "GET_FILE_SUCCESS";

export const importFile = (type, file) => async (dispatch) => {
  const formData = new FormData();

  formData.append('file', file);

  const res = await axios.post(`/files/import/${type}`, formData)
  dispatch({ type: GET_FILE_SUCCESS })
  return res.data
}
