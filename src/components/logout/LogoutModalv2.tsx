import React, { useState } from 'react'
import './LogoutModalv2.css'
import { Button, Modal } from 'antd'
import { loginApi } from '../../api/signin'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions/authActions'
import errorHandler from '../../functions/errorHandler'
const LogoutModalv2 = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const showModal = () => {
    setError('')
    setOpen(true)
  }

  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
      handleLogout()
    }, 1000)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleLogout = async () => {
    setError('')

    try {
      dispatch(login('', ''))
      onLoginSuccess()
      window.location.reload()
    } catch (error: any) {
      console.error('Erro ao realizar logout:', error)
      setError(errorHandler(error))
    }
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Sair
      </Button>
      <Modal className='login-modal'
        open={open}
        title="Tem certeza que deseja sair do sistema?"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Sim
          </Button>
        ]}
      >
      {error && <p className="login-error-message">{error}</p>}
      <div className='emptydiv'></div>
      </Modal>
    </>
  )
}

export default LogoutModalv2