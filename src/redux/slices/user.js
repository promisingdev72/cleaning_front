import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  myProfile: null,
  users: [],
  employees: [],
  customers: [],
};

const slice = createSlice({
  name: 'user',
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

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.myProfile = action.payload;
    },

    // GET USERS
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // GET EMPLOYEES
    getEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.employees = action.payload;
    },

    // GET CUSTOMERS
    getCustomerSuccess(state, action) {
      state.isLoading = false;
      state.customers = action.payload;
    },

    // DELETE USERS
    // deleteUser(state, action) {
    //   const deleteUser = filter(state.userList, (user) => user.id !== action.payload);
    //   state.userList = deleteUser;
    // },
    // DELETE EMPLOYEES
    deleteEmployee(state, action) {
      const deleteEmployee = filter(state.employees, (employees) => employees.id !== action.payload);
      state.employees = deleteEmployee;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;

// ----------------------------------------------------------------------

export function getProfile() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/account/profile');
      dispatch(slice.actions.getProfileSuccess(response.data.profile));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getEmployees() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/account/employees');
      dispatch(slice.actions.getEmployeeSuccess(response.data.employees));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCustomers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/account/customers');
      dispatch(slice.actions.getCustomerSuccess(response.data.customers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addNewEmployee({ data }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/addnewemployee', data).then((response) => {
        dispatch(slice.actions.getUserSuccess(response.data.users));
        return response.status;
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteEmployee(employeeId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/account/deleteemployee', { employeeId });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
