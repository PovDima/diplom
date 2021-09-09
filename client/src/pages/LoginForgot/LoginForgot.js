import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper, Typography, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { sendResetPasswordLink } from "../../store/actions/auth";
import { emailValidation } from '../../utils/authValidation'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px'
  },
  paperWrapper: {
    padding: '35px',
    width: '450px',
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
  fieldTitle: {
    marginRight: '15px'
  },
  message: {
    textAlign: 'center'
  }
}))

const LoginForgot = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.users);
  const [serverError, setServerError] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [email, setEmail] = useState('')



  const handleSubmit = () => {
    emailValidation.validate({ email }).then((data) => {
      dispatch(sendResetPasswordLink(email))
        .then(() => setIsSubmited(true))
        .catch((error) => {
          if (error.response) {
            setServerError(error.response.data.message);
          }
        });
    }).catch(err => {
      setServerError(err.message);
    })
  };

  return isAuth ? (
    <Redirect to='/statements' />
  ) : isSubmited ? (
    <div className={classes.wrapper}>
      <Paper className={classes.paperWrapper}>
        <Typography className={classes.message}>
          Лист з посиланням для зміни паролю був відправлений на пошту. <b>У вас є 12 годин щоб змінити пароль для вашого акаунту. </b>
          Це може заняти 15 хвилин, щоб отримати лист
        </Typography>
      </Paper>
    </div >
  ) : (
    <div className={classes.wrapper}>
      <Paper className={classes.paperWrapper}>
        <Typography>Ми відправимо лист з посиланням для зміни паролю на пошту :</Typography>
        <div className={classes.fieldWrapper}>
          <Typography className={classes.fieldTitle}>Пошта</Typography>
          <TextField variant={'outlined'} value={email} onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className={classes.buttonsWrapper}>
          <Button onClick={handleSubmit}>
            Відправити лист
          </Button>
        </div>
        {serverError}
      </Paper>
    </div >
  )
}
export default LoginForgot
