import axios from '../../utils/axios'

export const GET_OFFERS_SUCCESS = "GET_OFFERS_SUCCESS";
export const DELETE_OFFERS_SUCCESS = "DELETE_OFFERS_SUCCESS";
export const UPDATE_OFFERS_SUCCESS = "UPDATE_OFFERS_SUCCESS";
export const CREATE_OFFERS_SUCCESS = "CREATE_OFFERS_SUCCESS";
export const GET_OFFER_SUCCESS = "GET_OFFER_SUCCESS";

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


export const getOffer = (offerId) => async (dispatch) => {
  const res = await axios.get(`/offers/${offerId}`)
  dispatch({ type: GET_OFFER_SUCCESS, offer: res.data.offer })
  return res.data.offer
}
export const deleteOffer = (offerId) => async (dispatch) => {
  await axios.delete(`/offers/${offerId}`)
  dispatch({ type: DELETE_OFFERS_SUCCESS })
}

export const updateOffer = (offerId, data) => async (dispatch) => {
  await axios.put(`/offers/${offerId}`, data)
  dispatch({ type: UPDATE_OFFERS_SUCCESS })
}

export const createOffer = (data) => async (dispatch) => {
  await axios.post(`/offers`, data)
  dispatch({ type: CREATE_OFFERS_SUCCESS })
}
