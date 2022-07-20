/* eslint-disable prettier/prettier */
import axios from '../utils/axios';

// ----------------------------------------------------------------------

export default function sendSms(sms) {
  try {
    axios.post('/api/account/sendSms', sms).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
}
