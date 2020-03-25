import axios from 'axios'

class API {
  constructor () {
    this.axi = axios.create({
      baseURL: process.env.api,
      timeout: 25000,
      json: true
    })
  }

  setToken = (token) => {
    this.axi.headers['Authorization'] = 'Bearer ' + token;
  }

  httpGet = (uri, params) => {
    return this.axi.get(uri, {
      params
    })
  }

  httpPost = (uri, data) => this.axi.post(uri, data)
}

const api = new API()

export const httpGet = api.httpGet
export const setToken = api.setToken
export const httpPost = api.httpPost
