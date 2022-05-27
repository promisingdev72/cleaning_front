/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';

// redux
import { addOrder, editOrder, deleteOrder, addStatus } from '../redux/slices/order';

// ----------------------------------------------------------------------

export default function useOrder() {
  const dispatch = useDispatch();

  return {
    // --------------  Editing part ---------------------
    editOrder: ({ resData }) => {
      dispatch(editOrder({ resData }));
    },
    // --------------  Creating part ---------------------
    addOrder: ({ resData }) => {
      dispatch(addOrder({ resData }));
    },

    // --------------  Creating part ---------------------
    addStatus: ({ statusData }) => {
      dispatch(addStatus({ statusData }));
    },

    // --------------  Delete Employee ---------------------
    deleteOrder: (id) => {
      dispatch(deleteOrder(id));
    },
  };
}
