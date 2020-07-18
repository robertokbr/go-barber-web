import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Routes from './Routes';
import { AuthProvider } from './hooks/AuthContext';
import Toast from './components/ToastContainer';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <BrowserRouter>
        <Routes />
        <Toast />
      </BrowserRouter>
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
