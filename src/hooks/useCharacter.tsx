import { useLazyQuery } from "@apollo/client";
import { createContext, ReactNode, RefObject, useContext, useEffect, useRef, useState } from "react";
import { GET_CHARACTERS_RANGE } from "../graphql/queries";

type CharacterProviderProps = {
  children: ReactNode;
};

type CharacterContextData = {
  charactersRef: RefObject<HTMLInputElement>;
  randomCharactersIds: number[];
  maxCharactersId: number;
  setRandomCharactersIds(ids: number[]): void;
};

const CharacterContext = createContext<CharacterContextData>({} as CharacterContextData);

export function CharacterProvider({ children }: CharacterProviderProps) {
  const charactersRef = useRef<HTMLInputElement>(null);
  
  const [maxCharactersId, setMaxCharactersId] = useState(0);
  const [randomCharactersIds, setRandomCharactersIds] = useState<number[]>([]);

  const [getCharactersRange, { error, data }] = useLazyQuery(GET_CHARACTERS_RANGE);

  useEffect(() => {
    getCharactersRange();

    if(error) console.error(error);

    if(data) setMaxCharactersId(data.characters.info.count);
  }, [getCharactersRange, data, error]);
  

  return(
    <CharacterContext.Provider value={{ charactersRef, maxCharactersId, randomCharactersIds, setRandomCharactersIds }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);

  return context;
}