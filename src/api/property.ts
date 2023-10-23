import axios from 'axios'
import { DefaultApi, ReqType } from './defaultAPI'

const API_URL = 'https://sua-api.com/imoveis'

export async function getImoveis(page: any) {
  try {
    const response = await axios.get(API_URL, {
      params: { page },
    })
    return response.data
  } catch (error) {
    console.error('Erro ao buscar a lista de imóveis:', error)
    throw error
  }
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