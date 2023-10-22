import { DefaultApi, ReqType } from './defaultAPI'

export const signup = async (req: ISignupReq) => {
  try {
    const response = await new DefaultApi(
      '/unauth/login/register',
      ReqType.post,
      req
    ).useAxios()

    console.log({ response: response?.data })
    return response?.data
  } catch (error) {
    console.log({ apiError: error })
    throw error
  }
}

export interface ISignupReq {
  email: string
  name: string
  cellphone: string
  password: string
  level: string
}
