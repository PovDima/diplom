import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from "react-router-dom";

import { getStatements, deleteStatement } from "../../store/actions/statements";
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

  const getStatementsList = useCallback(async () => {
    setIsLoading(true);
    try {
      dispatch(getStatements({})).then(() => setIsLoading(false))
    } catch (err) {
      setIsLoading(false)
      console.error(err);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getStatementsList().catch()
    // eslint-disable-next-line
  }, []);

  const handleCreateStatement = () => history.push(`/statements/create`)
  const handleDeleteStatement = async ({ statementId }) => dispatch(deleteStatement(statementId))
  const handleUpdateStatement = async (data) => history.push(`/statements/${data.statementId}`)

  return (
    <div className={classes.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <GridTable
          rowData={statements}
          fileName={'Заявки'}
          columns={statementsColumns}
          deleteRow={handleDeleteStatement}
          updateRow={handleUpdateStatement}
          createRow={handleCreateStatement}
        />
      )}
    </div>
  );
}

export default Statements
