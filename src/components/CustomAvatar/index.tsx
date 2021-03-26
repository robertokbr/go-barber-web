import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ICustomAvatarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'small' | 'normal' | 'big';
  interactiveProps?: {
    text: string;
  };
}

const CustomAvatar: React.FC<ICustomAvatarProps> = ({
  size,
  children,
  interactiveProps,
  ...rest
}) => {
  return (
    <Container {...rest} size={size}>
      {children}
      {interactiveProps && <p>{interactiveProps.text}</p>}
    </Container>
  );
};

export default CustomAvatar;
