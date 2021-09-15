import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from "react-router-dom";

import { getOffers, deleteOffer } from "../../store/actions/offers";
import Loader from "../../components/Loader";
import GridTable from '../../components/GridTable'
import { offersColumns } from '../../utils/columns'

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

const Offers = () => {
  const history = useHistory();
  const { offers } = useSelector((state) => state.offers);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const classes = useStyles()

  const getDeliveriesList = useCallback(async () => {
    setIsLoading(true);
    try {
      dispatch(getOffers({})).then(() => setIsLoading(false))
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

  const handleCreateOffer = () => history.push(`/offers/create`)
  const handleDeleteOffer = async ({ offerId }) => dispatch(deleteOffer(offerId))
  const handleUpdateOffer = async (data) => history.push(`/offers/${data.offerId}`)

  return (
    <div className={classes.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <GridTable
          rowData={offers}
          fileName={'Конкурсні пропозиції'}
          columns={offersColumns}
          deleteRow={handleDeleteOffer}
          updateRow={handleUpdateOffer}
          createRow={handleCreateOffer}
        />
      )}
    </div>
  );
}

export default Offers
