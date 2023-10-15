import React, { useState } from 'react';
import './LoginModal.css';
import { loginApi } from '../../api/signin';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { login } from '../../redux/actions/authActions';

function LoginModal({ onClose, onLoginSuccess }: { onClose: any, onLoginSuccess: () => void }) {
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(true); // Inicialmente, o modal é exibido

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await loginApi(email, password);
      const token = response.token;
      dispatch(login(token));

      onLoginSuccess();
      setShowLoginModal(false); // Feche o modal após o login com sucesso
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Verifique suas credenciais.');
      if (error?.response?.data?.error) setError(error?.response?.data?.error);
    }
  };

  return (
    <CSSTransition
      in={showLoginModal} // Define quando a animação deve ser executada (true para entrada, false para saída)
      timeout={300} // Duração da animação em milissegundos
      classNames="modal" // Nome da classe CSS para a animação
      unmountOnExit
    >
      <div className="login-modal-overlay" onClick={onClose}>
        <div className="login-modal" onClick={(e) => e.stopPropagation()}>
          <h2>Login</h2>
          <form className="input-container" onSubmit={handleFormSubmit}>
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
            <button type="submit">Entrar</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </CSSTransition>
  );
}

export default LoginModal;
