import { FormEvent } from "react";
import { useEpisode } from "../../hooks/Episode";
import { getRandomIds } from "../../utils/getRandomIds";

export function EpisodeForm() {
  const { characters, locations, maxLocationId, maxCharactersId, setRandomLocationIds, setRandomCharactersIds, setCharacters, setLocations } = useEpisode();


  async function getData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const randomLocationIds = getRandomIds(maxLocationId, Number(locations));
      const randomCharacterIds = getRandomIds(maxCharactersId, Number(characters));
      setRandomLocationIds(randomLocationIds);
      setRandomCharactersIds(randomCharacterIds);
    } catch(err) {
      console.log(err);
    }
  }

  return(
    <>
      <h1>Crie o seu episódio</h1>
      <form onSubmit={getData}>
        <input type="number" min="0" value={characters} onChange={(e) => setCharacters(e.target.value)} placeholder="Número de personagens"/>
        <input type="number" min="0" value={locations} onChange={(e) => setLocations(e.target.value)} placeholder="Número de locais"/>
        <button type="submit">Teste</button>

        <ul>
          <li>
            <h2>Teste</h2>
            <h2>Teste</h2>
          </li>
        </ul>
      </form>
    </>
  );
}