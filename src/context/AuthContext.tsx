// @ts-nocheck
import React, { useState, createContext, ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

export const AuthContext = createContext({
  authenticated: null,
  userId: '',
  providerId: null,
  setUserId: () => {},
  setProviderId: () => {},
  setAuthenticated: () => {}
});

export default ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [userId, setUserId] = useState('');
  const [providerId, setProviderId] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        setAuthenticated: setAuthenticated,
        userId: userId,
        setUserId: setUserId,
        providerId: providerId,
        setProviderId: setProviderId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
