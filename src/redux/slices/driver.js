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

export function addDriver({ data }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/adddriver', data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteDriver(employeeId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/delemployee', { employeeId });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editDriver({ data }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/editcustomer', data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
