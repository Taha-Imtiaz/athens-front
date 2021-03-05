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

const Axios = () => {
  axios.defaults.baseURL = 'https://athens-backend.herokuapp.com/api/';
  // axios.defaults.baseURL = 'http://localhost:3001/api/';
  // axios.defaults.baseURL = '/api/';
  // axios.defaults.baseURL = 'http://10.0.6.197:3000/api';



  // Request Interceptor
  axios.interceptors.request.use(req => {
    if (navigator.onLine) {
      requestHandler(req)
      store.dispatch({ type: 'START_LOADING' })
    } else {
      // 'Please check internet connection.'
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
    store.dispatch({ type: 'FINISH_LOADING' })
    if (axios.isCancel(err)) {
    } else {
      // handle error
      if (err.message === "Network Error") {
        // Server Is Down, Try Latter
        store.dispatch(showMessage('Server Is Down, Try Latter.'))
      }
      else if (err.message === "Request failed with status code 401") {
        localStorage.clear();
        window.location.reload();
      }
    }
    return Promise.reject(err);
  })
}

export default Axios;