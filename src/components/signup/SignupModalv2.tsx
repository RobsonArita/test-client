import React, { useState } from 'react'
import './SignupModalv2.css'
import { Button, Modal } from 'antd'
import { ISignupReq, signup } from '../../api/signup'

const SignupModalv2: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const [userType, setUserType] = useState('proprietario')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cellphone, setCellphone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const showModal = () => {
    setError('')
    setOpen(true)
  }

  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 3000)
  }

  const handleCancel = () => {
    clearFields()
    setOpen(false)
  }

  const clearFields = () => {
    setUserType('')
    setName('')
    setEmail('')
    setCellphone('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()

    try {
      setLoading(true)
      const reqBody: ISignupReq = {
        name,
        cellphone,
        email,
        level: userType,
        password
      }
      await signup(reqBody)

      setSuccess('Usuário registrado com sucesso!')
      setError('')
      clearFields()
    } catch (error: any) {
      console.error('Erro ao fazer login:', error)
      setError('Erro ao fazer login. Verifique suas credenciais.')
      if (error?.response?.data?.error) setError(error?.response?.data?.error)
      setSuccess('')
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <Button type="primary" onClick={showModal}>
        Registrar Usuário
      </Button>
      <Modal className='signup-modal'
        open={open}
        title="Registre sua conta"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleFormSubmit}>
            Enviar
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            loading={loading}
            onClick={handleOk}
            target="_blank"
          >
            Botão google
          </Button>,
        ]}
      >
          <label>Tipo de usuário:</label>
            <select className='usertype' value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="proprietario">Proprietário</option>
              <option value="locatario">Locatário</option>
            </select>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Telefone"
              value={cellphone}
              onChange={(e) => setCellphone(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
      {error && <p className="signup-error-message">{error}</p>}
      {success && <p className="signup-success-message">{success}</p>}
      </Modal>
    </>
  )
}

export default SignupModalv2