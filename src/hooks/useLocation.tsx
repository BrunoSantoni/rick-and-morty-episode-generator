import { useLazyQuery } from '@apollo/client';
import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { GET_LOCATIONS_RANGE } from '../graphql/queries';

type LocationProviderProps = {
  children: ReactNode;
};

type LocationContextData = {
  locationsRef: RefObject<HTMLInputElement>;
  maxLocationId: number;
  randomLocationIds: number[];
  setRandomLocationIds(ids: number[]): void;
};

const LocationContext = createContext<LocationContextData>(
  {} as LocationContextData,
);

export function LocationProvider({ children }: LocationProviderProps) {
  const locationsRef = useRef<HTMLInputElement>(null);

  const [maxLocationId, setMaxLocationId] = useState(0);
  const [randomLocationIds, setRandomLocationIds] = useState<number[]>([]);

  const [getLocationsRange, { error, data }] = useLazyQuery(
    GET_LOCATIONS_RANGE,
  );

  useEffect(() => {
    getLocationsRange();

    if (error) toast.error(error);

    if (data) setMaxLocationId(data.locations.info.count);
  }, [getLocationsRange, data, error]);

  return (
    <LocationContext.Provider
      value={{
        locationsRef,
        maxLocationId,
        randomLocationIds,
        setRandomLocationIds,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);

  return context;
}
