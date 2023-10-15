import React, { useState } from 'react'
import './header.css'
import LoginModal from '../login/LoginModal'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions/authActions'
import LogoutModal from '../logout/LogoutModal'

function Header() {
  const dispatch = useDispatch()

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  const handleLoginClick = () => {
    setShowLoginModal(true)
  }

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleCloseLoginModal = () => {
    setShowLoginModal(false)
  }

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false)
  }

  const handeLoginSucess = () => {
    setAuthenticated(true)
  }

  const handleLogout = () => {
    // Lógica para fazer logout, como limpar o token no Redux
    dispatch(login('')); // Limpe o token no Redux
    setAuthenticated(false); // Atualize o estado de autenticação
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
      {authenticated ? ( // Verifica se o usuário está autenticado
      <button onClick={handleLogoutClick} className="logout-button">
        Logout
      </button>
    ) : (
      <button onClick={handleLoginClick} className="login-button">
        Login
      </button>
    )}
      {showLoginModal && <LoginModal onClose={handleCloseLoginModal} onLoginSuccess={handeLoginSucess} />}
      {showLogoutModal && <LogoutModal onClose={handleCloseLogoutModal} onLogoutSuccess={handleLogout}/>}
    </header>
  )
}

export default Header
