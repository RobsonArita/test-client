export enum AxiosErrorCodes {
  networkError = 'ERR_NETWORK'
}

const errorHandler = (err: any): string => {
  if (err?.code === AxiosErrorCodes.networkError) return 'Ocorreu um erro ao se comunicar com a API. Tente novamente mais tarde.'
  if (err?.response?.data?.error) return err?.response?.data?.error?.toString()

  return 'Ocorreu um erro. Tente novamente mais tarde.'
}

export default errorHandler