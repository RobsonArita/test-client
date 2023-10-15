import './LogoutModal.css'

function LogoutModal({ onClose, onLogoutSuccess }: { onClose: any, onLogoutSuccess: () => void }) {
  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal">
        <h3>Tem certeza que deseja fazer Logout?</h3>
        <div className="button-container">
          <button type="submit" onClick={onLogoutSuccess}>Sim</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
