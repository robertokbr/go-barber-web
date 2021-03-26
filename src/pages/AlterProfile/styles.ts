import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

interface AvatarProps {
  loading: boolean;
}

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
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

const rotate = keyframes`
  from{
    transform: rotate(0);
  }
  to{
    transform: rotate(180deg);
  }
`;

export const Header = styled.header`
  background: #28262e;
  height: 144px;
  width: 100%;
  display: flex;
  align-items: center;

  > a {
    margin-left: 4%;
    color: #f4ede8;
    display: block;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;

    p {
      @media (max-width: 720px) {
        display: none;
      }
    }

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  animation: ${appearFromRight} 1s;

  form {
    margin: 64px 0;
    width: 340px;
    text-align: left;

    h1 {
      margin-bottom: 24px;
      font-size: 24px;
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
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 8%;
`;

export const AvatarContainer = styled.label<AvatarProps>`
  position: relative;

  input {
    visibility: hidden;
  }

  > img {
    position: absolute;
    width: 48px;
    bottom: -4%;
    right: 8%;
    transition: 0.4s ease-in-out;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      transform: rotate(180deg);
    }

    animation: ${props => props.loading && rotate} infinite 0.5s linear;
  }
`;
