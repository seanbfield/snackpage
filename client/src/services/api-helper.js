import axios from 'axios'

const baseURL = 'http://localhost:3000/api/users'
const api = axios.create({
  baseURL: baseURL
})

// ================= //
// ***** USERS ***** //
// ================= //


// GET ALL USERS http://localhost:3000/api/users/
export const allUsers = async () => {
  const resp = await api.get('/')
  console.log(resp);
}


//GET SINGLE USER
export const getOneUser = async (id) => {
  const resp = await api.get(`/${id}`)
  console.log(resp);
}

//GET CURRENT USER

export const getActiveUser = async () => {
  const resp = await api.get(`/current/`)
  console.log(resp);
}

// CREATE USER
export const registerUser = async (registerData) => {
  const resp = await api.post('/', { user: registerData })
  console.log(resp);
  return resp.data
}


const storeToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
}

// const getToken = () => {
//   const token = localStorage.getItem('authToken');
//   api.defaults.headers.common.authorization = `Bearer ${token}`;
// }

// LOGIN USER
export const loginUser = async (userInfo) => {
  const resp = await api.post('/login', { user: userInfo });
  console.log(resp);
  // const token = resp.data;
  // storeToken(token);
  return (resp)
}

// VERIFY USER

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/verify');
    return resp.data
  }
  return false;
}


//DELETE USER
export const deleteUser = async (id) => {
  const resp = await api.delete(`/${id}`)
  console.log(resp);
}

