import axios from 'axios';
import { ElMessage } from 'element-plus';

const request = axios.create();

request.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.getItem('token') || '';
    if (token !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

request.interceptors.response.use(
  (response) => {
    const { data: result } = response;

    if (result.code !== 200) {
      ElMessage.error({ message: '错误:' + result.message });
    }

    return result;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
