import React, { useState, createContext, ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

export const AuthContext = createContext({
  authenticated: null,
  userId: null,
  setUserId: () => { },
  setProviderId: () => { },
  setAuthenticated: () => { }
});

export default ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [userId, setUserId] = useState(null);
  const [providerId, setProviderId] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        // @ts-ignore
        setAuthenticated: setAuthenticated,
        userId: userId,
        // @ts-ignore
        setUserId: setUserId,
        providerId: providerId,
        // @ts-ignore
        setProviderId: setProviderId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
