import { ReactNode } from 'react';

import { CharacterProvider } from './useCharacter';
import { LocationProvider } from './useLocation';

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <CharacterProvider>
      <LocationProvider>{children}</LocationProvider>
    </CharacterProvider>
  );
}
