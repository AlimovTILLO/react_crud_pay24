import { API, getUserToken } from '../helpers';
export const passportService = {
  get,
  getAll,
  create,
  publicCreate,
  update,
  delete: _delete
};


function get(id) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.get(`/passports/${id}/`, headers)
}

function getAll() {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.get(`/passports/`, headers)
}

function create(passport) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.post(`/passports/`, passport, headers)
}

function publicCreate(passport) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.post(`/createpassports/`, passport, headers)
}

function update(passport) {
  const { id } = passport;
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.put(`/passports/${id}/`, passport, headers)
}


function _delete(id) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.delete(`/passports/${id}/`, headers)
}