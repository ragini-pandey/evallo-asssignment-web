import axios from 'axios';

const contentServiceInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

contentServiceInstance.interceptors.request.use(
  (request) => {
    console.log(request);
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

contentServiceInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response.data;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default contentServiceInstance;
