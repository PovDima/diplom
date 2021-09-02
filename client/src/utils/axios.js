import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api`,
  withCredentials: true
});

instance.interceptors.response.use(null, error => Promise.reject(error));

(function () {
  let token = localStorage.getItem('token');
  if (token) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
})();


export default instance
