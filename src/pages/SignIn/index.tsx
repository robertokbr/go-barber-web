import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Background, Content } from './styles';
import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="Gobarber" />
        <form>
          <h1>Faça seu Logon</h1>
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci Minha Senha</a>
        </form>
        <Link to="/signUp">
          <FiLogIn />
          Criar Conta
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
