/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';

// redux
import { editProfile } from '../redux/slices/user';

// ----------------------------------------------------------------------

export default function useProfile() {
  const dispatch = useDispatch();

  return {
    // --------------  Editing part ---------------------

    editProfile: ({ data }) => {
      dispatch(editProfile({ data }));
    },
  };
}
