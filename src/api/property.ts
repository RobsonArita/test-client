import { DefaultApi, ReqType } from './defaultAPI'

export interface IProperty {
  title?: string
  description?: string
  image?: string
  address?: string
}

export const fetchPropertyes = async (page: number) => {
  try {
    const response = await new DefaultApi(
      '/unauth/property',
      ReqType.get,
      {},
      { page }
    ).useAxios()
    return response?.data
  } catch (err) {
    throw err
  }
}

export class propertyAPI {
  private readonly token?: string
  constructor (token?: string) {
    this.token = token
  }

  async registerProperty (data: IProperty) {
    try {
      const response = await new DefaultApi(
        '/auth/property/solicitate',
        ReqType.post,
        data,
        {},
        this.token
      ).useAxios()
  
      console.log({ response: response?.data })
      return response?.data
    } catch (error) {
      console.log({ apiError: error })
      throw error
    }
  }

  async authProperties (page: number) {
    try {
      const response = await new DefaultApi(
        '/auth/property/',
        ReqType.get,
        {},
        { page },
        this.token
      ).useAxios()
  
      console.log({ response: response?.data })
      return response?.data
    } catch (error) {
      console.log({ apiError: error })
      throw error
    }
  }
}