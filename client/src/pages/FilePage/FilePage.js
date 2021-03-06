import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper } from "@material-ui/core";
import { importFile } from "../../store/actions/files";
import { startAlgorithm } from "../../store/actions/statements";
import Loader from "../../components/Loader";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px'
  },
  paperWrapper: {
    width: '500px',
    display: 'flex',
    padding: '35px',
    alignItems: 'center',
    flexDirection: 'column',
    height: '200px',
    justifyContent: 'space-around',
  },
  buttonsWrapper: {
    display: 'flex'
  },
  button: {
    textAlign: 'center',
    width: '100%'
  }
}))
const FilePage = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const [serverMessage, setServerMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (key) => (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      inputRef.current.value = '';
      setIsLoading(true)
      dispatch(importFile(key, file)).then((res) => setServerMessage(res.message)).catch((error) => {
        if (error.response) {
          setServerMessage(error.response.data.message);
        }
      }).finally(() => setIsLoading(false));
    };

  }

  const handleStartAlogorithm = async () => {
    setIsLoading(true)
    dispatch(startAlgorithm()).then((res) => { setServerMessage(res.message); setIsLoading(false) }).catch(() => setIsLoading(false))
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.paperWrapper}>
        {
          isLoading ?
            <Loader /> :
            <>
              <Button
                variant="contained"
                component="label"
                className={classes.button}
              >
                ?????????????????????? ???????????? ???????????????????? ????????????????????
                <input
                  type="file"
                  accept=".csv"
                  ref={inputRef}
                  onChange={handleChange('offer')}
                  hidden
                />
              </Button>
              <Button
                variant="contained"
                component="label"
                className={classes.button}
              >
                ?????????????????????? ???????????? ????????????
                <input
                  type="file"
                  accept=".csv"
                  ref={inputRef}
                  onChange={handleChange('statements')}
                  hidden
                />
              </Button>
              <Button
                variant="contained"
                component="label"
                className={classes.button}
                onClick={handleStartAlogorithm}
              >
                ?????????????????? ????????????????
              </Button>
              <br/>
              {serverMessage}
            </>
        }
      </Paper>
    </div>
  );
}

export default FilePage
