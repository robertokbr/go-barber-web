import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Container, Background, Content } from './styles';
import logo from '../../assets/logo.svg';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="Gobarber" />
        <form>
          <h1>Faça seu Logon</h1>
          <input placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Entrar</button>
          <a href="forgot">Esqueci Minha Senha</a>
        </form>
        <a href="createAccount">
          <FiLogIn />
          Criar Conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
