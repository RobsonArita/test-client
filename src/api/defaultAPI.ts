import axios, { AxiosRequestConfig } from "axios"

export enum ReqType {
  post = 'post',
  get = 'get',
  patch = 'patch',
  delete = 'delete'
}

export class DefaultApi {
  private readonly url?: string
  private readonly urlPath: string
  private readonly reqType: ReqType
  private readonly body?: { [key: string]: any }
  private readonly query?: any
  private readonly token?: string

  constructor (
    urlPath: string,
    reqType: ReqType,
    body?: { [key: string]: any },
    query?: any,
    token?: string
  ) {
    this.url = process.env.REACT_APP_BASE_URL
    this.urlPath = urlPath
    this.reqType = reqType
    this.body = body
    this.query = query
    this.token = token
  }

  async useAxios () {
    try {
      console.log({ url: this.url })
      if (!this.url?.length) throw new Error('Sever URL not found!')
      const response = await this[this.reqType]()

      return response
    } catch (err) {
      throw err
    }
  }

   setConfig () {
    const config: AxiosRequestConfig = {}
    if (this.token) config.headers = { Authorization: this.token }
    console.log({ config })
    return config
  }

  private async post () {
    console.log({ post: `${this.url}${this.urlPath}`, postBody: this.body })
    return await axios.post(`${this.url}${this.urlPath}`, this.body, this.setConfig())
  }

  private async get () {
    const getConfig = {
      ...this.setConfig(),
      params: { ...this.query },
    }
    console.log({ getConfig })
    const response = await axios.get(`${this.url}${this.urlPath}`, {
      ...this.setConfig(),
      params: { ...this.query },
    })

    return response
  }

  private async patch () {
    throw new Error('Method not implemented!')
  }

  private async delete () {
    throw new Error('Method not implemented!')
  }
}
