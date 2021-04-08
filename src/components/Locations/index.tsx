import { useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "../../graphql/queries";
import { useEpisode } from "../../hooks/Episode";
import { Loading } from "../Loading";

type LocationInfo = {
  id: string;
  name: string;
  type: string;
}

export function Locations() {
  const { randomLocationIds } = useEpisode();

  const { data, loading, error } = useQuery(GET_LOCATIONS, {
    variables: {
      randomLocationsIds: randomLocationIds,
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;
  
  return data.locationsByIds.map(({ id, name, type }: LocationInfo) => (
    <div key={id}>
      <p>{name}, {type}</p>
    </div>
  ));
}