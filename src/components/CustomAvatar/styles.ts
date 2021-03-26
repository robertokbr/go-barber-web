import styled from 'styled-components';

interface AvatarProps {
  size: 'small' | 'normal' | 'big';
}

const imageSize = {
  small: 56,
  normal: 80,
  big: 186,
};

const textSize = {
  small: 10,
  normal: 12,
  big: 16,
};

export const Container = styled.button<AvatarProps>`
  outline: 0;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  height: ${props => imageSize[props.size]}px;
  width: ${props => imageSize[props.size]}px;

  img {
    flex: 1;
    max-height: ${props => imageSize[props.size]}px;
    transition: 0.2s;
  }

  > p {
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    color: #fff;
    transform: translateY(186px);
    transition: 0.4s;
    font-size: ${props => textSize[props.size]}px;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    p {
      transform: translateY(100%);
    }
  }
`;
