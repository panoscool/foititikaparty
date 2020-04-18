// @ts-nocheck
import React, { useState, createContext, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext({
  user: null,
  userId: '',
  providerId: null,
  authenticated: null,
  setUser: () => { },
  setAuthenticated: () => { }
});

export default ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(null);

  const { uid, photoURL, displayName, providerData } = user || {};

  return (
    <AuthContext.Provider
      value={{
        user: user,
        authenticated: authenticated,
        userId: uid,
        photoURL: photoURL,
        displayName: displayName,
        providerId: user && providerData[0].providerId,
        setUser: setUser,
        setAuthenticated: setAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
