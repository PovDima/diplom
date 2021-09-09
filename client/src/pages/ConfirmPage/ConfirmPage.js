import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper, Typography } from "@material-ui/core";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { getConfirmation } from "../../store/actions/auth";

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
  title: {
    marginBottom: '10px'
  }
}))
const FilePage = () => {
  const history = useHistory();
  const classes = useStyles()
  const dispatch = useDispatch();
  const { token } = useParams();
  const { isAuth } = useSelector((state) => state.users);
  const [serverError, setServerError] = useState("");

  const handleSubmit = () => {
    dispatch(getConfirmation(token)).catch((error) => {
      if (error.response) {
        setServerError(error.response.data.message);
      }
    });
    history.push("/statements");
  }

  return isAuth ? (
    <Redirect to='/statements' />
  ) : (
    <div className={classes.wrapper}>
      <Paper className={classes.paperWrapper}>
        <Typography className={classes.title}>Натисніть тут для заверження верифікації</Typography>
        <Button onClick={handleSubmit}>Підтвердити</Button>
        {serverError}
      </Paper>
    </div>
  );
}

export default FilePage
