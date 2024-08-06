import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    console.log(`update ${id}  ${newObject.name}`)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    request.then(response => response.data)
}

export default { getAll, create, update }