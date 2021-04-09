import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { GET_CHARACTERS } from "../../graphql/queries";
import { useCharacter } from "../../hooks/useCharacter";
import { Loading } from "../Loading";

import styles from './styles.module.scss';

type CharacterInfo = {
  id: string;
  name: string;
  image: string;
}

export function Characters() {
  const { randomCharactersIds } = useCharacter();

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: {
      randomCharactersIds: randomCharactersIds,
    },
  });

  if (loading) return <Loading />;
  if (error) {
    toast.error('Error when fetching characters, try again');
    return <></>;
  };
  
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