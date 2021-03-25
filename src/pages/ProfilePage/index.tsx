import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiLock, FiMail, FiPower, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Container, Header, HeaderContent, Profile } from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import 'react-day-picker/lib/style.css';

import CustomAvatar from '../../components/CustomAvatar';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const ProfilePage: React.FC = () => {
  const { signOut, user } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const [userProfile, setUserProfile] = useState({});

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <CustomAvatar size="small">
              <img src={user.avatar_url} alt={user.name} />
            </CustomAvatar>
            <div>
              <span>Bem vindo!</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower size={20} />
          </button>
        </HeaderContent>
      </Header>
      <Form ref={formRef} onSubmit={() => {}}>
        <h1>Faça seu Cadastro</h1>
        <Input icon={FiUser} name="name" placeholder="Nome" />
        <Input icon={FiMail} name="email" placeholder="E-mail" />
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Senha"
        />
        <Button type="submit">Cadastrar</Button>
      </Form>
    </Container>
  );
};

export default ProfilePage;
