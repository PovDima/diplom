import axios from '../../utils/axios'

export const GET_OFFERS_SUCCESS = "GET_OFFERS_SUCCESS";

export const getOffers = (data) => async (dispatch) => {
  const { search, sortField, sortOrder } = data;
  let query = '';

  if (sortField) {
    query += '&sortField=' + sortField + '&sortOrder=' + sortOrder;
  }

  if (search) {
    query += '&search=' + encodeURIComponent(search);
  }

  const res = await axios.get(`/offers?${query}`)

  dispatch({
    type: GET_OFFERS_SUCCESS,
    offers: res.data.offers,
  })
}
