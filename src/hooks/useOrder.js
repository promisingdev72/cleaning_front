/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';

// redux
import { addOrder, editOrder, deleteOrder } from '../redux/slices/order';

// ----------------------------------------------------------------------

export default function useOrder() {
  const dispatch = useDispatch();

  return {
    // --------------  Editing part ---------------------
    editOrder: ({ data }) => {
      dispatch(editOrder({ data }));
    },
    // --------------  Creating part ---------------------
    addOrder: ({ resData }) => {
      dispatch(addOrder({ resData }));
    },

    // --------------  Delete Employee ---------------------
    deleteOrder: (id) => {
      dispatch(deleteOrder(id));
    },
  };
}
