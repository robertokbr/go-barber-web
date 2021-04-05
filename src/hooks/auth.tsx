import React, { createContext, useCallback, useState, useContext } from 'react';
import { isAfter } from 'date-fns';

import IUser from '../models/IUser';
import api from '../services/api';

interface AuthState {
  token: string;
  user: IUser;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: IUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  updateUser(userDate: IUser): void;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');
    const validation = localStorage.getItem('@GoBarber:validation');

    if (token && user && validation) {
      const validationDate = new Date(JSON.parse(validation));

      validationDate.setHours(23, 59);

      if (isAfter(validationDate, new Date())) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        return { token, user: JSON.parse(user) };
      }
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data as AuthState;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    localStorage.setItem('@GoBarber:validation', JSON.stringify(new Date()));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ user, token });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
    localStorage.removeItem('@GoBarber:validation');
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback((user: IUser) => {
    setData(state => ({
      ...state,
      user,
    }));

    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, updateUser, signOut, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
