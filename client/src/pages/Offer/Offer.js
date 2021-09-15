import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from 'moment';
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper, Typography, TextField, Select, MenuItem } from "@material-ui/core";

import Loader from "../../components/Loader";

import { getOffer, updateOffer, createOffer } from "../../store/actions/offers";
import { offersColumns } from '../../utils/columns';

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
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
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

const Offer = () => {
  const history = useHistory();
  const { offerId } = useParams()
  const [offer, setOffer] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles()

  const getOfferItem = useCallback(async () => {
    if (offerId) {
      setIsLoading(true);
      try {
        dispatch(getOffer(offerId)).then((data) => { setOffer(data); setIsLoading(false) })
      } catch (err) {
        setIsLoading(false)
        console.error(err);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getOfferItem().catch()
    // eslint-disable-next-line
  }, []);

  const handleChange = (key) => (e) => {
    setOffer({ ...offer, [key]: e.target.value })
  }

  const handleRequest = () => {
    if (offerId) {
      dispatch(updateOffer(offerId, offer)).then(() => history.push('/offers')).catch(error => {
        if (error.response) {
          setServerError(error.response.data.message)
        }
      })
    } else {
      dispatch(createOffer(offer)).then(() => history.push('/offers')).catch(error => {
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
            {offersColumns.map(col => (
              col?.selected?.length ?
                <div key={col.field} className={classes.fieldWrapper}>
                  <Typography>{col.headerName}</Typography>
                  <Select variant='outlined' value={offer[col.field] || ''} onChange={handleChange(col.field)}>
                    {col.selected.map(sel => <MenuItem key={sel} value={sel}>{sel}</MenuItem>)}
                  </Select>
                </div> :
                col?.isDate ?
                  <div key={col.field} className={classes.fieldWrapper}>
                    <Typography>{col.headerName}</Typography>
                    <TextField type='date' variant={'outlined'} value={moment.utc(offer[col.field]).format('YYYY-MM-DD')} onChange={handleChange(col.field)} />
                  </div>
                  :
                  <div key={col.field} className={classes.fieldWrapper}>
                    <Typography>{col.headerName}</Typography>
                    <TextField variant={'outlined'} value={offer[col.field]} onChange={handleChange(col.field)} />
                  </div>
            ))}
            <div className={classes.buttonWrapper}>
              <Button className={classes.buttonn} variant={'outlined'} onClick={handleRequest}>{offerId ? 'Оновити' : 'Створити'}</Button>
            </div>
            <Typography className={classes.error}>{serverError}</Typography>
          </>
        )}
      </Paper>
    </div>
  );
}

export default Offer
