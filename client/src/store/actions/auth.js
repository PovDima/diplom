import axios from '../../utils/axios'

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const SEND_PASSWORD_LINK_SUCCESS = "SEND_PASSWORD_LINK_SUCCESS";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const CONFIRMATION_USER_SUCCESS = "CONFIRMATION_USER_SUCCESS";
export const RESEND_CONFIRMATION_USER_SUCCESS = "RESEND_CONFIRMATION_USER_SUCCESS";
export const RESET_REGISTER_USER_SUCCESS = "RESET_REGISTER_USER_SUCCESS";

export const login = (user) => async (dispatch) => {
  const res = await axios.post('/auth/login', user)

  localStorage.setItem('token', res.data.token);
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
  dispatch({ type: LOGIN_USER_SUCCESS, user: res.data.user });
};

export const sendResetPasswordLink = (email) => async (dispatch) => {
  await axios.post('/auth/login/forgot', { email })
  dispatch({ type: SEND_PASSWORD_LINK_SUCCESS });
};

export const resetPassword = (password, token) => async (dispatch) => {
  await axios.post(`/auth/login/reset/${token}`, { password })
  dispatch({ type: RESET_PASSWORD_SUCCESS });
};

export const logout = () => async (dispatch) => {
  await axios.post(`/auth/logout`)
  delete axios.defaults.headers.common['Authorization'];
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT_USER_SUCCESS });
}

export const register = (user) => async (dispatch) => {
  const res = await axios.post('/auth/register', user)

  dispatch({ type: REGISTER_USER_SUCCESS, user: res.data.user });
};

export const getConfirmation = (token) => async (dispatch) => {
  await axios.post(`/auth/confirmation/${token}`)
  dispatch({ type: CONFIRMATION_USER_SUCCESS });
}

export const resendConfirmation = (email) => async (dispatch) => {
  await axios.post("/auth/resend", { email })
  dispatch({ type: RESEND_CONFIRMATION_USER_SUCCESS });
}

export const resetRegister = (email) => async (dispatch) => {
  await axios.post("/auth/register/reset", { email })
  dispatch({ type: RESET_REGISTER_USER_SUCCESS });
};


