import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper, Typography, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../store/actions/auth";
import { passwordValidation } from '../../utils/authValidation'

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
  },
  fieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0'
  }
}))

const LoginResetPassword = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.users);
  const { token } = useParams();
  const [serverError, setServerError] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    passwordValidation.validate({ password }).then((data) => {
      dispatch(resetPassword(password, token)).catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message);
        }
      });
    }).catch(err => {
      setServerError(err.message);
    })
  };

  return isAuth ? (
    <Redirect to='/entrants' />
  ) : (
    <div className={classes.wrapper}>
      <Paper className={classes.paperWrapper}>
        <div className={classes.fieldWrapper}>
          <Typography>Password</Typography>
          <TextField type={'password'} variant={'outlined'} value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <Button onClick={handleSubmit}>Reset password</Button>
        {serverError}
      </Paper>
    </div>
  );
}
export default LoginResetPassword
