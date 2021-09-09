import axios from '../../utils/axios'

export const SET_USER_SUCCESS = "SET_USER_SUCCESS";

export const getUser = () => async (dispatch) => {
  const res = await axios.get('/users')

  if (res.data.user) {
    dispatch({
      type: SET_USER_SUCCESS,
      user: res.data.user,
    })
  }
}
