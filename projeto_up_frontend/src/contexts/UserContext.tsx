import { Profile } from '@/@types/User';
import { createContext, useContext, useState } from 'react';

interface UserContextType {
    user: Profile | null;
    setUser: (user: Profile | null) => void;
  }

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children}: {children:  React.ReactNode}) {
  const [user, setUser] = useState<Profile | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  
}