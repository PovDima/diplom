import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from "react-router-dom";

import { getStatements } from "../../store/actions/statements";
import Loader from "../../components/Loader";
import GridTable from '../../components/GridTable'
import { statementsColumns } from '../../utils/columns'

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: '20px',
    width: '100%',
    maxWidth: '100%',
    overflowX: 'hidden',
  },
  bodyWrapper: {},
  tableRow: {
    display: 'flex'
  },
  rowItem: {
    minWidth: '250px'
  },
  tableHeader: {
    display: 'flex',
    marginBottom: '20px'
  },
  headerItem: {
    minWidth: '250px'
  }
}))

const Statements = () => {
  const history = useHistory();
  const { statements } = useSelector((state) => state.statements);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const classes = useStyles()

  const getDeliveriesList = useCallback(async () => {
    setIsLoading(true);
    try {
      dispatch(getStatements({})).then(() => setIsLoading(false))
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getDeliveriesList().catch()
    // eslint-disable-next-line
  }, []);


  const handleClick = (e) => {
    // history.push(`/statements/${e.data._id}`)
  }

  return (
    <div className={classes.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <GridTable
          rowData={statements}
          fileName={'Заявки'}
          columns={statementsColumns}
          onClick={handleClick}
        />
      )}
    </div>
  );
}

export default Statements
