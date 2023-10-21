import React, { useState } from 'react';
import './SignupModalv2.css';
import { Button, Modal } from 'antd';
import { loginApi } from '../../api/signin';

const SignupModalv2: React.FC = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [userType, setUserType] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const showModal = () => {
    setError('')
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (event: any) => {
    setError('')
    event.preventDefault()

    try {
      setLoading(true);
      const response = await loginApi(email, password)
      const token = response.token

      setOpen(false) // Feche o modal após o login com sucesso
    } catch (error: any) {
      console.error('Erro ao fazer login:', error)
      setError('Erro ao fazer login. Verifique suas credenciais.')
      if (error?.response?.data?.error) setError(error?.response?.data?.error)
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
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
      {error && <p className="signup-error-message">{error}</p>}
      </Modal>
    </>
  );
};

export default SignupModalv2;