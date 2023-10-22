import { DefaultApi, ReqType } from './defaultAPI'

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await new DefaultApi(
      '/unauth/signin',
      ReqType.post,
      { email, password }
    ).useAxios()

    console.log({ response: response?.data })
    return response?.data
  } catch (error) {
    console.log({ apiError: error })
    throw error
  }
}
