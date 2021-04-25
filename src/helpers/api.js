import axios from 'axios';

import { history } from '../helpers';

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'

let ORIGING = "http://127.0.0.1:7000"


function getUserData() {
  // return authorization header with jwt token
  let data = JSON.parse(localStorage.getItem('token'));
  const token = data ? data : ""
  return token
}

function authHeader() {
  const data = getUserData()
  if (data) {
    return { 'Authorization': 'Token ' + data };
  } else {
    return {};
  }
}


export const API = new class Axios {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${ORIGING}/api/v1`
    });
  }

  get(url) {
    return this.axiosInstance.get(url, { headers: authHeader() }).then(response => handleResponse(response)).catch(error => handleError(error))
  }

  delete(url) {
    return this.axiosInstance.delete(url, { headers: authHeader() }).then(response => handleResponse(response)).catch(error => handleError(error))
  }

  post(url, data, headers) {
    return this.axiosInstance.post(url, data, { headers: headers }).then(response => handleResponse(response)).catch(error => handleError(error))
  }

  put(url, data, headers) {
    return this.axiosInstance.put(url, data, { headers: headers }).then(response => handleResponse(response)).catch(error => handleError(error))
  }

  patch(url, data, headers) {
    return this.axiosInstance.patch(url, data, { headers: headers }).then(response => handleResponse(response)).catch(error => handleError(error))
  }
}

function handleResponse(response) {
  return response.data
}

function handleError(error) {
  if (error.response.status === 401) {
    history.push('/login');
    return error.response.data
  }
  return error.response.data
}