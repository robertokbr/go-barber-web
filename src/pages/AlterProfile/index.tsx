import React, { useCallback, useRef, ChangeEvent, useState } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import {
  Container,
  Content,
  AnimationContainer,
  AvatarContainer,
  Header,
} from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import CustomAvatar from '../../components/CustomAvatar';
import cameraSvg from '../../assets/camera.svg';
import IUser from '../../models/IUser';

interface ProfileUpdateData {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}

const AlterProfile: React.FC = () => {
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const [userAvatar, setUserAvatar] = useState(user.avatar_url);

  const [loading, setLoading] = useState(false);

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        const data = new FormData();

        data.append('avatar', file);

        setLoading(true);

        try {
          const { data: updatedUser } = await api.patch<IUser>(
            '/users/avatar',
            data,
          );

          setUserAvatar(updatedUser.avatar_url);
          updateUser(updatedUser);

          addToast({
            type: 'success',
            description: 'Avatar Atualizado com sucesso',
            title: 'Sucesso!',
          });
        } catch {
          addToast({
            type: 'error',
            description: 'Oooops! Ocorreu um erro na atualização',
            title: 'Erro!',
          });
        } finally {
          setLoading(false);
        }
      }
    },
    [addToast, updateUser],
  );

  const handleSubmit = useCallback(
    async (data: ProfileUpdateData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          email: Yup.string()
            .required('O E-mail é obrigatório')
            .email('Digite um E-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().min(6, 'A senha deve ter no minimo 6 digitos'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().min(6, 'A senha deve ter no minimo 6 digitos'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'As senhas não coincidem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { data: updatedUser } = await api.put<IUser>('/profile', data);

        updateUser(updatedUser);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Perfil Atualizado!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro na atualização do perfil!',
        });
      }
    },
    [addToast, history, updateUser],
  );

  return (
    <Container>
      <Header>
        <Link to="/">
          <FiArrowLeft />
          <p>Voltar para Dashboard</p>
        </Link>
      </Header>
      <Content>
        <AnimationContainer>
          <AvatarContainer htmlFor="avatar" loading={loading}>
            <CustomAvatar
              size="big"
              type="button"
              interactiveProps={{
                text: 'Alterar',
              }}
            >
              <input type="file" id="avatar" onChange={handleAvatarChange} />
              <img src={userAvatar} alt={user.name} />
            </CustomAvatar>
            <img src={cameraSvg} alt="Foto" />
          </AvatarContainer>
          <Form
            initialData={{
              name: user.name,
              email: user.email,
            }}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <h1>Meu perfil</h1>
            <Input icon={FiUser} name="name" placeholder="Nome" />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
              icon={FiLock}
              name="old_password"
              type="password"
              placeholder="Senha Atual"
              marginTop
            />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova Senha"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmar nova Senha"
            />
            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default AlterProfile;
