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
  storeToken(resp.data)
  console.log(resp);
  return resp.data
}

const storeToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
}

const getToken = () => {
  const token = localStorage.getItem('authToken');
  api.defaults.headers.common.authorization = `Bearer ${token}`;
}

// LOGIN USER
export const loginUser = async (loginData) => {
  const resp = await api.post('/login', { user: loginData });
  console.log(resp);
  const token = resp.data;
  storeToken(token);
  return (resp)
}


// VERIFY USER
// export const verifyUser = async () => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     api.defaults.headers.common.authorization = `Bearer ${token}`
//     const resp = await api.get('/verify');
//     return resp.data
//   }
//   return false;
// }

//DELETE USER
export const deleteUser = async (id) => {
  const resp = await api.delete(`/${id}`)
  console.log(resp);
}

// ================== //
// *** SNACK SITES *** //
// ================== //

//GET ALL SITE BY USER
export const getUserSites = async (id) => {
  const resp = await api.get(`/${id}/sites/`)
  console.log(resp);
  return resp.data
}


//GET ALL SITE BY USER
//user_site GET / users /: user_id / sites /: id
export const getSiteData = async (id, data) => {
  const resp = await api.get(`/${id}/sites/`, { site: data })
  console.log(resp);
  return resp.data
}

//POST - CREATE SITE
export const newUserSite = async (id, data) => {
  const resp = await api.post(`/${id}/sites/`, { site: data })
  console.log(id)
  console.log(resp);
  return resp.data
}

//UPDATE - SITE
//users/: user_id / sites /: site_id / pages /: id(.: format)


export const updateSite = async (user_id, site_id, id, data) => {
  const resp = await api.put(`/${user_id}/sites/${site_id}/pages/${id}`, { page: data })
  return resp.data
}



// DESTROY - DELETE SITE /users/: user_id / sites /: id(.: format)

export const deleteSite = async (user_id, id) => {
  const resp = await api.delete(`/${user_id}/sites/${id}`);
  return resp.data;
}

export const getSite = async (user_id, id) => {
  const resp = await api.get(`/${user_id}/sites/${id}`);
  console.log(resp.data.content);
  return resp.data;
}

// ==================== //
// **** SITE PAGES **** //
// ==================== //


// CREATE PAGE -  /users/:user_id/sites/:site_id/pages
export const addPage = async (user_id, id, data) => {
  let temp = { page: { content: JSON.stringify(data) } };
  console.log(temp);
  let resp = await api.post(`/${user_id}/sites/${id}/pages/`, { page: { content: JSON.stringify(data) } });
  console.log(JSON.parse(resp.data.content));
  return resp.data;
}


export const updatePage = async (user_id, id, data) => {
  const resp = await api.put(`/${user_id}/sites/${id}/pages/`, { page: { content: JSON.stringify(data) } });
  console.log(resp);
  return resp.data

}

