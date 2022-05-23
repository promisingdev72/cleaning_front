/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';

// redux
import { addDriver, editDriver, deleteDriver } from '../redux/slices/driver';

// ----------------------------------------------------------------------

export default function useDriver() {
  const dispatch = useDispatch();

  return {
    // --------------  Editing part ---------------------
    editDriver: ({ data }) => {
      dispatch(editDriver({ data }));
    },
    // --------------  Creating part ---------------------
    addDriver: ({ data }) => {
      dispatch(addDriver({ data }));
    },

    // --------------  Delete part ---------------------
    deleteDriver: (id) => {
      dispatch(deleteDriver(id));
    },
  };
}
