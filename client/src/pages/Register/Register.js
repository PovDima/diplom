import React, { useState } from "react";
import clsx from 'clsx'
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper, Typography, TextField } from "@material-ui/core";

import { register, resendConfirmation, resetRegister } from "../../store/actions/auth";
import { registrationValidation, emailValidation } from '../../utils/authValidation'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px'
  },
  paperWrapper: {
    padding: '35px',
    width: '550px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  register: {
    width: '400px',
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

const Register = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState("");
  const [email, setEmail] = useState("");
  const [registerStep, setRegisterStep] = useState("register");
  const [state, setState] = useState({
    email: "",
    password: "",
  })

  const handleChange = key => e => {
    setState({ ...state, [key]: e.target.value })
  }

  const handleSubmit = () => {
    registrationValidation.validate(state).then((data) => {
      dispatch(register(state))
        .then(() => {
          setEmail(state.email);
          setRegisterStep("resend");
        })
        .catch((error) => {
          if (error.response) {
            setServerError(error.response.data.message);
          }
        });
    }).catch(err => {
      setServerError(err.message)
    })
  };

  const handleResendEmail = () => {
    emailValidation.validate(state).then((data) => {
      dispatch(resendConfirmation(email))
        .then(() => setRegisterStep("reset"))
        .catch((error) => {
          if (error.response) {
            setServerError(error.response.data.message);
          }
        })
    }).catch(err => {
      setServerError(err.message)
    })
  };

  const handleReset = () => {
    emailValidation.validate(state).then((data) => {
      dispatch(resetRegister(email)).catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message);
        }
      })
    }).catch(err => {
      setServerError(err.message)
    })
  };

  const renderSwitch = () => {
    switch (registerStep) {
      case "register":
        return (
          <>
            <div className={classes.fieldWrapper}>
              <Typography className={classes.fieldTitle}>Пошта</Typography>
              <TextField variant={'outlined'} value={state.email} onChange={handleChange('email')} />
            </div>
            <div className={classes.fieldWrapper}>
              <Typography className={classes.fieldTitle}>Пароль</Typography>
              <TextField type={'password'} variant={'outlined'} value={state.password} onChange={handleChange('password')} />
            </div>
            <Button onClick={handleSubmit} >
              Зареєструватися
            </Button>
            {serverError}
          </>
        );
      case "resend":
        return (
          <>
            <Typography>Лист для верифікації був відправлений на пошту</Typography>
            <Typography>У користувача є 12 годин щоб активувати його акаунт.</Typography>
            <Typography>Це може заняти 15 хвилин, щоб отримати лист</Typography>
            <Button onClick={handleResendEmail}>Користувач не отримав лист? Натисніть щоб відправити ще раз</Button>
            {serverError}
          </>
        );
      case "reset":
        return (
          <>
            <Typography>Користувач ще не отримав лист? </Typography>
            <Typography>Спробуйте зареєструватися його ще раз. Можливо ви вказали неправильну пошту.</Typography>
            <Button onClick={handleReset}>Натисніть щоб видалити існуючий акаунт</Button>
            {serverError}
          </>
        );
      default:
        break;
    }
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={clsx(classes.paperWrapper, { [classes.register]: registerStep === 'register' })}>
        {renderSwitch()}
      </Paper>
    </div>
  )
}

export default Register
