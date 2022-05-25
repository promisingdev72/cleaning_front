/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';

// redux
import { addAssignEmployees } from '../redux/slices/assign';

// ----------------------------------------------------------------------

export default function useAssign() {
  const dispatch = useDispatch();

  return {
    addAssignEmployees: (data) => {
      dispatch(addAssignEmployees({ data }));
    },
  };
}
