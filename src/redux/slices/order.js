import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: false,
  orders: [],
  assignedOrders: [],
};

const slice = createSlice({
  name: 'order',
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
    getOrderSuccess(state, action) {
      state.isLoading = false;
      state.orders = action.payload;
    },
    getAssignedOrderSuccess(state, action) {
      state.isLoading = false;
      state.assignedOrders = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

export function getAllOrders() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/account/getallorder');
      dispatch(slice.actions.getOrderSuccess(response.data.orders));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAssignedOrders(employeeId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/account/getassignedorder', { params: { employeeId } });
      dispatch(slice.actions.getAssignedOrderSuccess(response.data.assignedOrders));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addOrder({ resData }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/addorder', resData);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addStatus({ statusData }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/addstatus', statusData);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addStatus2({ statusData }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/addstatus2', statusData);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteOrder(orderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/delorder', { orderId });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editOrder({ resData }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/editorder', resData);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
