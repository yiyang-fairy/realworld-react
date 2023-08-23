import axios from "axios";
// import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.realworld.io/api";

const request = axios.create({
  baseURL: BASE_URL,
});

let localToken = localStorage.getItem('token');

export const setLocalToken = (token) => {
  localToken = token;
  localStorage.setItem('token', token);
};

export const hasLogin = () => {
  return !!localToken;
};

// const navigate = useNavigate()

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前可以进行一些处理，例如添加请求头、身份验证等
    const token = localToken;
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    else if(config.url !== "/users/login") {
      // location.href = '/login'
      // navigate("/login")
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理
    return response.data;
  },
  (error) => {
    // 对响应错误进行处理
    return Promise.reject(error);
  }
);

export { request };
