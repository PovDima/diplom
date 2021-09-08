import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper, Typography, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store/actions/auth";
import { loginValidation } from '../../utils/authValidation'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px'
  },
  paperWrapper: {
    padding: '35px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  fieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0'
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  fieldsWrapper: {
    width: '100%',
    marginBottom: '20px'
  },
  link: {
    color: '#000'
  }
}))

const Login = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.users);
  const [state, setState] = useState({ email: "", password: "", })
  const [serverError, setServerError] = useState("");

  const handleSubmit = () => {
    loginValidation.validate(state).then((data) => {
      dispatch(login(data)).catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message);
        }
      });
    }).catch(err => {
      setServerError(err.message)
    })
  };

  const handleChange = (key) => (e) => {
    setState({ ...state, [key]: e.target.value })
  }

  return isAuth ? (
    <Redirect to='/statements' />
  ) : (
    <div className={classes.wrapper}>
      <Paper className={classes.paperWrapper}>
        <div className={classes.fieldsWrapper}>
          <div className={classes.fieldWrapper}>
            <Typography>Пошта</Typography>
            <TextField variant={'outlined'} value={state.email} onChange={handleChange('email')} />
          </div>
          <div className={classes.fieldWrapper}>
            <Typography>Пароль</Typography>
            <TextField type={'password'} variant={'outlined'} value={state.password} onChange={handleChange('password')} />
          </div></div>
        <Link className={classes.link} to='/login/forgot'>Забули ваш пароль?</Link>
        <div className={classes.buttonsWrapper}>
          <Button onClick={handleSubmit}>
            Увійти
          </Button>
          <Link className={classes.link} to='/register'>Реєстрація</Link>
        </div>
        {serverError}
      </Paper>
    </div>
  )
}

export default Login
