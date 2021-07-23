import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pipo-api.herokuapp.com'
})

export default api
