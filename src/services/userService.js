import axios from './customize-axios.js';

const fetchAllUser = (page) =>{
    return axios.get(`/api/users?page=${ page }`)
}

const postCreateUser = ( name, job ) => {
    return axios.post("/api/users", { name, job })
}

const putUpdateUser = ( name, job, id ) => {
    return axios.put(`/api/users/${id}`, { name, job })
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}

const loginUser = (email, password) => {
    return axios.post("/api/login", { email, password })
}

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginUser }