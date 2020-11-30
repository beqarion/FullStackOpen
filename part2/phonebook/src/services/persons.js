import axios from 'axios'
const url = 'http://localhost:3001/persons'
const getAll = () => axios.get(url).then(response=>response.data)
const create = (newObj) => axios.post(url,newObj).then(response=>response.data)
const deleteContact = (id) => axios.delete(`${url}/${id}`)

export default { getAll, create, deleteContact }