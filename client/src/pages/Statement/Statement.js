import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from 'moment'
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper, Typography, TextField, Select, MenuItem } from "@material-ui/core";

import Loader from "../../components/Loader";

import { getStatement, createStatement, updateStatement } from "../../store/actions/statements";
import { statementsColumns } from '../../utils/columns';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: '20px',
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  paperWrapper: {
    padding: '35px',
    width: '700px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    maxWidth: '50%'
  },
  fieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0'
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonn: {
    width: '200px'
  },
  error: {
    textAlign: 'center',
    marginTop: '10px'
  }
}))

const Statement = () => {
  const history = useHistory();
  const { statementId } = useParams()
  const [statement, setStatement] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles()

  const handleChange = (key) => (e) => {
    setStatement({ ...statement, [key]: e.target.value })
  }

  const getStatementItem = useCallback(async () => {
    if (statementId) {
      setIsLoading(true);
      try {
        dispatch(getStatement(statementId)).then((data) => { setStatement(data); setIsLoading(false) })
      } catch (err) {
        setIsLoading(false)
        console.error(err);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getStatementItem().catch()
    // eslint-disable-next-line
  }, []);

  const handleRequest = () => {
    if (statementId) {
      dispatch(updateStatement(statementId, statement)).then(() => history.push('/statements')).catch(error => {
        if (error.response) {
          setServerError(error.response.data.message)
        }
      })
    } else {
      dispatch(createStatement(statement)).then(() => history.push('/statements')).catch(error => {
        if (error.response) {
          setServerError(error.response.data.message)
        }
      })
    }
  }
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.paperWrapper}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {statementsColumns.map(col => (
              col?.selected?.length ?
                <div key={col.field} className={classes.fieldWrapper}>
                  <Typography className={classes.title}>{col.headerName}</Typography>
                  <Select variant='outlined' value={statement[col.field] || ''} onChange={handleChange(col.field)}>
                    {col.selected.map(sel => <MenuItem key={sel} value={sel}>{sel}</MenuItem>)}
                  </Select>
                </div> :
                col?.isDate ?
                  <div key={col.field} className={classes.fieldWrapper}>
                    <Typography>{col.headerName}</Typography>
                    <TextField type='date' variant={'outlined'} value={moment.utc(statement[col.field]).format('YYYY-MM-DD')} onChange={handleChange(col.field)} />
                  </div>
                  :
                  <div key={col.field} className={classes.fieldWrapper}>
                    <Typography className={classes.title}>{col.headerName}</Typography>
                    <TextField variant={'outlined'} value={statement[col.field]} onChange={handleChange(col.field)} />
                  </div>
            ))}
            <div className={classes.buttonWrapper}>
              <Button className={classes.buttonn} variant={'outlined'} onClick={handleRequest}>{statementId ? 'Оновити' : 'Створити'}</Button>
            </div>
            <Typography className={classes.error}>{serverError}</Typography>
          </>
        )}
      </Paper>
    </div>
  );
}

export default Statement
