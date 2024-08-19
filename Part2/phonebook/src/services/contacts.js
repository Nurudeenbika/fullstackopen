import axios from "axios"
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  console.log(`update ${id} ${newObject.name}`)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)

}

export default { getAll, create, update, remove }