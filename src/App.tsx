// App.js
import React from 'react';
import GlobalStyles from './global/GlobalStyles';
import ApplicationRoutes from './routes';
import Header from './components/header/header';

function App() {
  return (
    <div>
      <Header />
      <GlobalStyles /> {/* Adicione os estilos globais aqui */}
      <h1>Meu Aplicativo React</h1>
      <ApplicationRoutes />
      {/* <ImoveisList /> */}
    </div>
  );
}

export default App;
