import { useLazyQuery } from "@apollo/client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { GET_LOCATIONS_RANGE, GET_CHARACTERS_RANGE } from "../graphql/queries";

type EpisodeProviderProps = {
  children: ReactNode;
};

type EpisodeContextData = {
  characters: string;
  randomCharactersIds: number[];
  maxCharactersId: number;
  setRandomCharactersIds(ids: number[]): void;
  setCharacters(newValue: string): void;

  locations: string;
  randomLocationIds: number[];
  maxLocationId: number;
  setRandomLocationIds(ids: number[]): void;
  setLocations(newValue: string): void;
};

const EpisodeContext = createContext<EpisodeContextData>({} as EpisodeContextData);

export function EpisodeProvider({ children }: EpisodeProviderProps) {
  const [characters, setCharacters] = useState('0');
  const [locations, setLocations] = useState('0');
  const [maxLocationId, setMaxLocationId] = useState(0);
  const [randomLocationIds, setRandomLocationIds] = useState<number[]>([]);
  
  const [maxCharactersId, setMaxCharactersId] = useState(0);
  const [randomCharactersIds, setRandomCharactersIds] = useState<number[]>([]);

  const [getLocationsRange, { error, data: locationsData }] = useLazyQuery(GET_LOCATIONS_RANGE);
  const [getCharactersRange, { error: charactersErrors, data: charactersData }] = useLazyQuery(GET_CHARACTERS_RANGE);

  useEffect(() => {
    getLocationsRange();
    getCharactersRange();

    if(error) console.error(error);

    if(locationsData) setMaxLocationId(locationsData.locations.info.count);
    if(charactersData) setMaxCharactersId(charactersData.characters.info.count);
  }, [getLocationsRange, getCharactersRange, locationsData, charactersData, error]);
  

  return(
    <EpisodeContext.Provider value={{ characters, locations, maxCharactersId, maxLocationId, randomCharactersIds, setRandomCharactersIds, randomLocationIds, setRandomLocationIds, setCharacters, setLocations }}>
      {children}
    </EpisodeContext.Provider>
  );
}

export function useEpisode() {
  const context = useContext(EpisodeContext);

  return context;
}