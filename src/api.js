import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pipo-api-heroku.herokuapp.com'
})

export default api
