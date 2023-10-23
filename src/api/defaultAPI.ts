import axios from "axios"

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

  constructor (
    urlPath: string,
    reqType: ReqType,
    body?: { [key: string]: any },
    query?: any
  ) {
    this.url = process.env.REACT_APP_BASE_URL
    this.urlPath = urlPath
    this.reqType = reqType
    this.body = body
    this.query = query
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

  private async post () {
    return await axios.post(`${this.url}${this.urlPath}`, this.body)
  }

  private async get () {
    const response = await axios.get(`${this.url}${this.urlPath}`, {
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
