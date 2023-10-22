import React, { useState } from 'react'
import './LoginModalv2.css'
import { Button, Modal } from 'antd'
import { loginApi } from '../../api/signin'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions/authActions'
import errorHandler from '../../functions/errorHandler'
import keyPressHandler from '../../functions/keyPressHandler'

const LoginModalv2 = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleKeyUp = (event: any) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleFormSubmit(event)
    }
  }

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
    setOpen(false)
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()

    try {
      setLoading(true)
      const { signinResponse } = await loginApi(email, password)

      const token = signinResponse.token
      const user = signinResponse.user

      dispatch(login(token, user))

      setOpen(false)
      onLoginSuccess()
    } catch (error: any) {
      console.error('Erro ao fazer login:', error)
      setError(errorHandler(error))
      // onLoginSucess()
      // setOpen(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Entrar
      </Button>
      <div onKeyUp={handleKeyUp}>
      <Modal className='login-modal'
        open={open}
        title="Insira suas credênciais de acesso"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleFormSubmit}>
            Enviar
          </Button>
        ]}
      >
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
      {error && <p className="login-error-message">{error}</p>}
      <div className='emptydiv'></div>
      </Modal>
      </div>
    </>
  )
}

export default LoginModalv2