/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';

// redux
import { addBus, editBus, deleteBus } from '../redux/slices/bus';

// ----------------------------------------------------------------------

export default function useBus() {
  const dispatch = useDispatch();

  return {
    // --------------  Editing part ---------------------
    editBus: ({ data }) => {
      dispatch(editBus({ data }));
    },
    // --------------  Creating part ---------------------
    addBus: ({ data }) => {
      dispatch(addBus({ data }));
    },

    // --------------  Delete part ---------------------
    deleteBus: (id) => {
      dispatch(deleteBus(id));
    },
  };
}
