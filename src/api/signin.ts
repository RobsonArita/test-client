// api.js
import axios from 'axios'

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://25.18.66.27:3000/unauth/signin', { email, password })
    return response.data // Retorne os dados da resposta
  } catch (error) {
    console.log({ error })
    throw error // Lança o erro para tratamento posterior
  }
}
