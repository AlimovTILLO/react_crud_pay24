import { API } from '../helpers';

export const passportService = {
  login,
  logout,
  getPassports,
  getPassport,
  createPassport,
  updatePassport,
  getCurrentUser,
};

function login(username, password) {
  let data = new FormData();
  data.append('username', username);
  data.append('password', password);

  let headers = {
    'Content-Type': 'text/html'
  };

  return API.post('/login/', data, headers)
    .then(user => {
      const token = JSON.stringify(user.token)
      localStorage.setItem('token', token);
      return user;
    });
}

function logout() {
  let token = getUserToken()
  if (token.length > 0) {
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Token ' + token
    };
    localStorage.removeItem('token');
    return API.post(`/logout/`, {}, headers)
  }
}

function getPassports() {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.get(`/passports/`, headers)
}


function getPassport(id) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.get(`/passports/${id}/`, headers)
}

function createPassport(passport) {
  return API.post(`/passports/`, passport)
}

function updatePassport(passport) {
  const { id } = passport;
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.put(`/passports/${id}/`, passport, headers)
}

function getCurrentUser(id) {
  return API.get(`/currentuser/`)
}


export function getUserToken() {
  // return authorization header with jwt token
  const data = JSON.parse(localStorage.getItem('token'));
  const token = data ? data : ""
  return token
}