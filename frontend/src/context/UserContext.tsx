import React, { createContext, useState, useLayoutEffect } from 'react';
import api from '../services/api';

export interface User {
  _id?: string;
  name?: string;
  email?: string;
}

export type TUserContext<T = any> = {
  handleSignIn(email: string, password: string, navigation: any): Promise<void>;
  setUser(value: T): any;
  _setToken(token: string): void;
  token: string;
  user: T;
};

export const UserContext = createContext<Partial<TUserContext<User>>>({});

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');

  async function handleSignIn(
    email: string,
    password: string,
    navigation: any
  ) {
    if (email !== '' && email && password !== '' && password) {
      try {
        const response = await api.post('/signin', {
          email,
          password,
        });

        setUser(response.data.user);
        _setToken(response.data.token);

        navigation.push('/chat');
      } catch (err) {
        throw new Error(err);
      }
    } else {
    }
  }

  async function _setToken(tk: any) {
    localStorage.setItem('CR_TOKEN', tk);

    setToken(tk);
  }

  return (
    <UserContext.Provider
      value={{
        handleSignIn,
        setUser,
        _setToken,
        token,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
