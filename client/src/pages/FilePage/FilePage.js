import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper } from "@material-ui/core";
import { importFile } from "../../store/actions/files";
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
      dispatch(importFile(key, file)).then((res) => { console.log(res); setServerMessage(res.message); setIsLoading(false) }).catch((error) => {
        if (error.response) {
          setServerMessage(error.response.data.message);
        }
        setIsLoading(false)
      });
    };

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
                Імпортувати список конкурсних пропозицій
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
                Імпортувати список вступників
                <input
                  type="file"
                  accept=".csv"
                  ref={inputRef}
                  onChange={handleChange('statements')}
                  hidden
                />
              </Button>
              {serverMessage}
            </>
        }
      </Paper>
    </div>
  );
}

export default FilePage
