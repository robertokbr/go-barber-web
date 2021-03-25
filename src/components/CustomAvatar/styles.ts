import styled from 'styled-components';

interface AvatarProps {
  size: 'small' | 'normal';
}

export const Container = styled.div<AvatarProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => (props.size === 'small' ? 56 : 80)}px;
  width: ${props => (props.size === 'small' ? 56 : 80)}px;
  overflow: hidden;
  border-radius: 50%;

  img {
    flex: 1;
    max-height: ${props => (props.size === 'small' ? 56 : 80)}px;
  }
`;
