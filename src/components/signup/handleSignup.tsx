import { loginApi } from "../../api/signin"

export const handleSignup = async (
  event: any,
  form: { email: string, password: string, confirmPassword: string, userType: string }
  ): Promise<string> => {
    event.preventDefault()
    try {
    const response = await loginApi(form.email, form.password)
    return 'Usuário cadastrado com sucesso!'
  } catch (error: any) {
    console.error('Erro ao fazer login:', error)
    if (error?.response?.data?.error) return error?.response?.data?.error
    return 'Erro ao fazer login. Verifique suas credenciais.'
  }
}
