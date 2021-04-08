import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../../graphql/queries";
import { useEpisode } from "../../hooks/Episode";
import { Loading } from "../Loading";

import styles from './styles.module.scss';

type CharacterInfo = {
  id: string;
  name: string;
  image: string;
}

export function Characters() {
  const { randomCharactersIds } = useEpisode();

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: {
      randomCharactersIds: randomCharactersIds,
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;
  
  return(
    <ul className={styles.characterList}>
    { data.charactersByIds.map(({ id, name, image }: CharacterInfo) => (
      <li key={id}>
        <figure>
          <img src={image} alt="Imagem"/>
          <figcaption>{name}</figcaption>
        </figure>
      </li>
    )) }
    </ul>
  );
}