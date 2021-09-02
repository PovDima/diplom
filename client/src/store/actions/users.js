import axios from '../../utils/axios'

export const SET_USER_REQUEST = "SET_USER_REQUEST";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAIL = "SET_USER_FAIL";

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: SET_USER_REQUEST });

    const res = await axios.get('/users')

    if (res.data.user) {
      dispatch({
        type: SET_USER_SUCCESS,
        user: res.data.user,
      })
    }

  } catch (err) {
    dispatch({ type: SET_USER_FAIL })
  }
}
