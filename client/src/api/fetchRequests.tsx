import axios from "axios";
import ENV from "../config/env";
import Cookies from 'universal-cookie';



let baseUrl = ENV.BASE_URL;
const cookies = new Cookies();

axios.interceptors.request.use(
  (config) => {

    if(cookies.get('usertkn')) {
      config.headers = {...config.headers, Authorization: `Possessor ${cookies.get('usertkn')}`}
    }

    return config;
  },
  (error) => Promise.reject(error)
)

const Get = (path: string) => axios.get(`${baseUrl}${path}`);

const Post = (data: any, path: string) => axios.post(`${baseUrl}${path}`, data);

const PostWithParams = (params: any, path: string) =>
  axios.post(`${baseUrl}${path}:/${params}`);

const PostWithParamsAndData = (params: any, path: string, data: any) =>
  axios.post(`${baseUrl}${path}:/${params}`, data);

const Api = {
  Get,
  Post,
  PostWithParams,
  PostWithParamsAndData,
};

export default Api;
