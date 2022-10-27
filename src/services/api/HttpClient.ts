import axios, { Axios } from 'axios'

export class HttpClient {
  private static instance: HttpClient
  client: Axios

  private constructor(){
    this.client = axios.create({
      baseURL: `${process.env.VUE_APP_API_URL}`
    })
  }

  static getInstance(){
    if(!HttpClient.instance){
      HttpClient.instance = new HttpClient()
    }
    return HttpClient.instance
  }

  setToken(token: string){
    this.client = axios.create({
      baseURL: `${process.env.VUE_APP_API_URL}`,
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
}