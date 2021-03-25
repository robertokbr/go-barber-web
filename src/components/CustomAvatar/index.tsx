import React from 'react';

import { Container } from './styles';

interface ICustomAvatarProps {
  size: 'small' | 'normal';
}

const CustomAvatar: React.FC<ICustomAvatarProps> = ({ size, children }) => {
  return <Container size={size}>{children}</Container>;
};

export default CustomAvatar;
