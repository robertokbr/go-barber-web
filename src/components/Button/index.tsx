import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';
import loadingGif from '../../assets/loading.gif';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? (
      <div>
        <p>Carregando</p>
        <img src={loadingGif} alt="Carregando..." />
      </div>
    ) : (
      children
    )}
  </Container>
);

export default Button;
