export function getUserToken() {
    // return authorization header with jwt token
    const data = JSON.parse(localStorage.getItem('token'));
    const token = data ? data : ""
    return token
  }