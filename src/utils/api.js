import axios from 'axios';
import store from '../Redux/store'
import { showMessage } from '../Redux/Common/commonActions';


const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty('handlerEnabled') && config.handlerEnabled ?
    true : false
}

const requestHandler = (request) => {
  if (isHandlerEnabled(request.config)) {
    // Modify request here
    request.headers['Authorization'] = localStorage.getItem('athens-token')
  }
  return request
}

// const Axios = axios.create({
// baseURL: `/api/`
// baseURL: `https://athens-backend.herokuapp.com/api/`
// baseURL: `http://10.0.5.97:3001/api/`
// baseURL: `http://10.0.4.217:3001/api/`
// baseURL: `http://localhost:3001/api/`
// baseURL: 'https://athens-297121.uc.r.appspot.com/api/'
// });

// Axios.interceptors.request.use(req => {
//   showLoader();
//   return req;
// }, error => {
//   return Promise.reject(error);
// }
// );

const Axios = () => {
  axios.defaults.baseURL = 'https://athens-backend.herokuapp.com/api/';

  // Request Interceptor
  axios.interceptors.request.use(req => {
    if (navigator.onLine) {
      requestHandler(req)
      store.dispatch({ type: 'START_LOADING' })
    } else {
      store.dispatch(showMessage('Please check internet connection.'))
      throw new axios.Cancel('Operation canceled due to disconnection of internet.');
    }
    return req
  }, err => {
    store.dispatch({ type: 'FINISH_LOADING' })
    return Promise.reject(err);
  })

  // Response Interceptor
  axios.interceptors.response.use(res => {
    store.dispatch({ type: 'FINISH_LOADING' })
    return res
  }, err => {
    if (axios.isCancel(err)) {
      console.log('Request canceled', err.message);
    } else {
      // handle error
      store.dispatch({ type: 'FINISH_LOADING' })
      if (err.message === "Network Error") {
        // Server Is Down, Try Latter
        console.log('Server Is down')
      }
    }
    return Promise.reject(err);
  })
}

export default Axios;