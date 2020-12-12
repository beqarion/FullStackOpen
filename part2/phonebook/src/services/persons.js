import axios from 'axios'
// const url = 'http://localhost:3001/api/persons'
const url = 'https://young-sierra-82258.herokuapp.com/api/persons'
const getAll = () => axios.get(url).then(response=>response.data)
const create = (newObj) => axios.post(url,newObj).then(r=>r.data)
const deleteContact = (id) => axios.delete(`${url}/${id}`)
const update = (id, newObj) => axios.put(`${url}/${id}`,newObj).then(r=>r.data)

export default { getAll, create, deleteContact, update }