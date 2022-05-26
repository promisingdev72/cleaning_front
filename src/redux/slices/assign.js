import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: false,
  assignes: [],
};

const slice = createSlice({
  name: 'assign',
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
    // GET Assigns
    getAssignEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.assignes = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

export function addAssignEmployees({ data }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/account/addassignemployees', data);
      dispatch(slice.actions.getAssignEmployeeSuccess(response.data.assignEmployees));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAssignEmployees(orderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/account/getassignemployees', { params: { orderId } });
      dispatch(slice.actions.getAssignEmployeeSuccess(response.data.assignEmployees));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
