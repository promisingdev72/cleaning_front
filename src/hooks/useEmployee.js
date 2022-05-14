/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';

// redux
import { addNewEmployee, deleteEmployee } from '../redux/slices/user';

// ----------------------------------------------------------------------

export default function useEmployee() {
  const dispatch = useDispatch();

  return {
    // --------------  Creating part ---------------------
    addNewEmployee: ({ data }) => {
      dispatch(addNewEmployee({ data }));
    },

    // --------------  Delete Employee ---------------------
    deleteEmployee: (id) => {
      dispatch(deleteEmployee(id));
    },
  };
}
