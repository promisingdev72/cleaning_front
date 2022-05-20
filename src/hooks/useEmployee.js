/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';

// redux
import { addEmployee, deleteEmployee } from '../redux/slices/user';

// ----------------------------------------------------------------------

export default function useEmployee() {
  const dispatch = useDispatch();

  return {
    // --------------  Creating part ---------------------
    addEmployee: ({ data }) => {
      dispatch(addEmployee({ data }));
    },

    // --------------  Delete Employee ---------------------
    deleteEmployee: (id) => {
      dispatch(deleteEmployee(id));
    },
  };
}
