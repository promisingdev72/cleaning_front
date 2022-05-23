import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: false,
  drivers: [],
};

const slice = createSlice({
  name: 'driver',
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
    // GET Orders
    getDriverSuccess(state, action) {
      state.isLoading = false;
      state.drivers = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

export function getDrivers(customerId) {
  console.log('here is redux', customerId);
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/account/getdriver', { customerId });
      dispatch(slice.actions.getDriverSuccess(response.data.drivers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
