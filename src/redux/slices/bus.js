import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: false,
  buses: [],
};

const slice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // GET Buses
    getBusSuccess(state, action) {
      state.isLoading = false;
      state.buses = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

export function getBuses(customerId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/account/getbus', { params: { customerId } });
      dispatch(slice.actions.getBusSuccess(response.data.buses));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addBus({ data }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/addbus', data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteBus(busId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/delbus', { busId });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editBus({ data }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/editbus', data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
