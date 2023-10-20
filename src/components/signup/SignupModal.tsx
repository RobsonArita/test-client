import React, { useState } from 'react'
import './SignupModal.css'
import { loginApi } from '../../api/signin'
import { useDispatch } from 'react-redux'

import { login } from '../../redux/actions/authActions'

function SignupModal({ onClose, onSignupSuccess }: { onClose: any, onSignupSuccess: () => void }) {
  const dispatch = useDispatch()

  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userType, setUserType] = useState('')
  const [,setShowLoginModal] = useState(true) // Inicialmente, o modal é exibido

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()

    try {
      const response = await loginApi(email, password)
      const token = response.token
      dispatch(login(token))

      onSignupSuccess()
      setShowLoginModal(false) // Feche o modal após o login com sucesso
    } catch (error: any) {
      console.error('Erro ao fazer login:', error)
      setError('Erro ao fazer login. Verifique suas credenciais.')
      if (error?.response?.data?.error) setError(error?.response?.data?.error)
    }
  }

  return (
      <div className="signup-modal-overlay" onClick={onClose}>
        <div className="signup-modal" onClick={(e) => e.stopPropagation()}>
          <h2>Registre sua conta</h2>
          <form className="signup-input-container" onSubmit={handleFormSubmit}>
          <label>Tipo de usuário:</label>
            <select value={userType} onChange={(e) => setUserType(e.target.value)}>
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

            <button type="submit">Registrar</button>
          </form>
          
          {error && <p className="signup-error-message">{error}</p>}
        </div>
      </div>
  )
}

export default SignupModal
