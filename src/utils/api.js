import axios from 'axios';

export default axios.create({
  baseURL: `https://athens-backend.herokuapp.com/api/`
});