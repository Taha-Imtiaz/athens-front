import axios from 'axios';
// import { showLoader } from '../Redux/Common/commonActions'

const Axios = axios.create({
  baseURL: `https://athens-backend.herokuapp.com/api/`
});

// Axios.interceptors.request.use(req => {
//   showLoader();
//   return req;
// }, error => {
//   return Promise.reject(error);
// }
// );

export default Axios;