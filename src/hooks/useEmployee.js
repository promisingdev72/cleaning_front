/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';

// redux
import { addNewEmployee } from '../redux/slices/user';

// ----------------------------------------------------------------------

export default function useEmployee() {
  const dispatch = useDispatch();

  return {
    // --------------  Creating part ---------------------
    addNewEmployee: ({ data }) => dispatch(addNewEmployee({ data })),

    // --------------  Delete Paper ---------------------
    // deleteEmployee: ({ employeeId }) => dispatch(deleteEmployee({ employeeId })),
  };
}
