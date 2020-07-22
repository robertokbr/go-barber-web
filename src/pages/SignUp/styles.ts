import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import { Keyframes } from 'react-spring/renderprops';
import SignUpbackground from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

const appearFromRight = keyframes`
from{
opacity: 0;
transform: translatex(50px);

}
to{
opacity: 1;
transform: translatex(0);

}
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  animation: ${appearFromRight} 1s;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
    }

    button {
      background: #ff9000;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #312e38;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;
      &:hover {
        background: ${shade(0.2, '#ff9000')};
      }
    }
  }

  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    transition: color 0.2s;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: center;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignUpbackground}) no-repeat center;
  background-size: cover;
`;
