import { API, getUserToken } from '../helpers';

export const userService = {
  login,
  logout,
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


function getCurrentUser(id) {
  return API.get(`/currentuser/`)
}


