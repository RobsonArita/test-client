import React, { useState } from 'react'
import './header.css'
import LoginModal from '../../login/LoginModal'
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/actions/authActions'
import LogoutModal from '../../logout/LogoutModal'
import SignupModal from '../../signup/SignupModal'

function AppHeader() {
  const dispatch = useDispatch()

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  const handleLoginClick = () => {
    setShowLoginModal(true)
  }

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleSignupClick = () => {
    setShowSignupModal(true)
  }

  const handleCloseLoginModal = () => {
    setShowLoginModal(false)
  }

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false)
  }

  const handleCloseSignupModal = () => {
    setShowSignupModal(false)
  }

  const handeLoginSucess = () => {
    setAuthenticated(true)
  }

  const handleLogout = () => {
    // Lógica para fazer logout, como limpar o token no Redux
    dispatch(login('', '')); // Limpe o token no Redux
    setAuthenticated(false); // Atualize o estado de autenticação
  }

  const handleSignupSuccess = () => {
  }

  return (
    <header className="app-header">
      <nav>
        <ul>
          <li><a href="/">Página Inicial</a></li>
          <li><a href="/about">Sobre</a></li>
          <li><a href="/contact">Contato</a></li>
        </ul>
      </nav>
      <div className="right-buttons">
      <button onClick={handleSignupClick} className="signup">Registrar</button>
        {authenticated ? (
        <button onClick={handleLogoutClick} className="logout-button">
          Logout
        </button>
      ) : (
        <button onClick={handleLoginClick} className="login-button">
          Login
        </button>
      )}
      </div>
      {showLoginModal && <LoginModal onClose={handleCloseLoginModal} onLoginSuccess={handeLoginSucess} />}
      {showLogoutModal && <LogoutModal onClose={handleCloseLogoutModal} onLogoutSuccess={handleLogout}/>}
      {showSignupModal && <SignupModal onClose={handleCloseSignupModal} onSignupSuccess={handleSignupSuccess} />}
    </header>
  )
}

export default AppHeader
