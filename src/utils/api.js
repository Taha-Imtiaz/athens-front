import axios from 'axios';
// import { showLoader } from '../Redux/Common/commonActions'
const Axios = axios.create({
  // baseURL: `/api/`
  baseURL: `https://athens-backend.herokuapp.com/api/`
  // baseURL: `http://10.0.4.213:3000/api/`
  // baseURL: `http://localhost:3000/api/`
});

// Axios.interceptors.request.use(req => {
//   showLoader();
//   return req;
// }, error => {
//   return Promise.reject(error);
// }
// );

export default Axios;