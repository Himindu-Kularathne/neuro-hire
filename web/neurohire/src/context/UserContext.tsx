// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import React, { useContext, useState } from "react";

const UserContext = React.createContext<any>(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  return (
    <UserContext.Provider value={{ user, setUser, profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
}
