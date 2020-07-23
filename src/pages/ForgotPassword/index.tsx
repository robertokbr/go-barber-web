import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import {
  Container,
  Background,
  Content,
  AnimationContainerSignIn,
} from './styles';
import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast, removeToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('O E-mail é obrigatório')
            .email('Digite um E-mail válido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        // recuperção de senha

        addToast({
          type: 'success',
          title: 'Email enviado!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description: 'Ocorreu um erro, tente novamente',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainerSignIn>
          <img src={logo} alt="Gobarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>
            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Button type="submit">Recuperar</Button>
          </Form>
          <Link to="/signin">
            <FiLogIn />
            Voltar ao Login
          </Link>
        </AnimationContainerSignIn>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
