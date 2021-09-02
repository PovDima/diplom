import axios from '../../utils/axios'

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";

export const SEND_PASSWORD_LINK_REQUEST = "SEND_PASSWORD_LINK_REQUEST";
export const SEND_PASSWORD_LINK_SUCCESS = "SEND_PASSWORD_LINK_SUCCESS";
export const SEND_PASSWORD_LINK_FAIL = "SEND_PASSWORD_LINK_FAIL";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAIL = "LOGOUT_USER_FAIL";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";

export const CONFIRMATION_USER_REQUEST = "CONFIRMATION_USER_REQUEST";
export const CONFIRMATION_USER_SUCCESS = "CONFIRMATION_USER_SUCCESS";
export const CONFIRMATION_USER_FAIL = "CONFIRMATION_USER_FAIL";

export const RESEND_CONFIRMATION_USER_REQUEST = "RESEND_CONFIRMATION_USER_REQUEST";
export const RESEND_CONFIRMATION_USER_SUCCESS = "RESEND_CONFIRMATION_USER_SUCCESS";
export const RESEND_CONFIRMATION_USER_FAIL = "RESEND_CONFIRMATION_USER_FAIL";

export const RESET_REGISTER_USER_REQUEST = "RESET_REGISTER_USER_REQUEST";
export const RESET_REGISTER_USER_SUCCESS = "RESET_REGISTER_USER_SUCCESS";
export const RESET_REGISTER_USER_FAIL = "RESET_REGISTER_USER_FAIL";


export const login = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const res = await axios.post('/auth/login', user)

    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
    dispatch({
      type: LOGIN_USER_SUCCESS,
      user: res.data.user,
    });
  } catch (err) {
    dispatch({ type: LOGIN_USER_FAIL });
  }
};

export const sendResetPasswordLink = (email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_PASSWORD_LINK_REQUEST });
    await axios.post('/auth/login/forgot', { email })
    dispatch({ type: SEND_PASSWORD_LINK_SUCCESS });
  } catch (err) {
    dispatch({ type: SEND_PASSWORD_LINK_FAIL });
  }
};

export const resetPassword = (password, token) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    await axios.post(`/auth/login/reset/${token}`, { password })
    dispatch({ type: RESET_PASSWORD_SUCCESS });
  } catch (err) {
    dispatch({ type: RESET_PASSWORD_FAIL });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });
    await axios.post(`/auth/logout`)
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (err) {
    dispatch({ type: LOGOUT_USER_FAIL });
  }
}

export const register = (user) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const res = await axios.post('/auth/register', user)

    dispatch({
      type: REGISTER_USER_SUCCESS,
      user: res.data.user,
    });
  } catch (err) {
    dispatch({ type: REGISTER_USER_FAIL });
  }
};

export const getConfirmation = (token) => async (dispatch) => {
  try {
    dispatch({ type: CONFIRMATION_USER_REQUEST });

    await axios.post(`/auth/confirmation/${token}`)

    dispatch({ type: CONFIRMATION_USER_SUCCESS });
  } catch (err) {
    dispatch({ type: CONFIRMATION_USER_FAIL });
  }
}

export const resendConfirmation = (email) => async (dispatch) => {
  try {
    dispatch({ type: RESEND_CONFIRMATION_USER_REQUEST });

    await axios.post("/auth/resend", { email })

    dispatch({ type: RESEND_CONFIRMATION_USER_SUCCESS });
  } catch (err) {
    dispatch({ type: RESEND_CONFIRMATION_USER_FAIL });
  }
}

export const resetRegister = (email) => async (dispatch) => {
  try {
    dispatch({ type: RESET_REGISTER_USER_REQUEST });

    await axios.post("/auth/register/reset", { email })

    dispatch({ type: RESET_REGISTER_USER_SUCCESS });
  } catch (err) {
    dispatch({ type: RESET_REGISTER_USER_FAIL });
  }
};


