import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export default function makeApi(baseURL: string) {
  const api = axios.create({
    baseURL,
  })

  api.defaults.headers.post['Content-Type'] = "application/json";
  api.defaults.headers.put['Content-Type'] = "application/json";
  api.defaults.headers.delete['Content-Type'] = "application/json";

  api.interceptors.request.use(
    (config) => {

      if(cookies.get('usertkn')) {
        config.headers = {...config.headers, Authorization: `Possessor ${cookies.get('usertkn')}`}
      }

      return config;
    },
    (error) => Promise.reject(error)
  )

  api.interceptors.response.use(
    (response) => response.data, // return data object
    (error) => Promise.reject(error)
  )
  return api
}
