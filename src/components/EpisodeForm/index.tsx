import { FormEvent } from "react";
import { toast } from 'react-toastify';

import { useCharacter } from "../../hooks/useCharacter";
import { useLocation } from "../../hooks/useLocation";
import { getRandomIds } from "../../utils/getRandomIds";

import styles from './styles.module.scss';

type EpisodeFormProps = {
  setIsFormSubmitted(newValue: boolean): void;  
};

export function EpisodeForm({ setIsFormSubmitted }: EpisodeFormProps) {
  const { charactersRef, maxCharactersId, setRandomCharactersIds } = useCharacter();
  const { locationsRef, maxLocationId, setRandomLocationIds  } = useLocation();

  async function getData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(!charactersRef.current) {
      toast.error('charatersRef is null');
      return;
    }

    if(!locationsRef.current) {
      toast.error('locationsRef is null');
      return;
    }

    const charactersQuantity = charactersRef.current.value;
    const locationsQuantity = locationsRef.current.value;

    const randomLocationIds = getRandomIds(maxLocationId, Number(locationsQuantity));
    const charactersIds = getRandomIds(maxCharactersId, Number(charactersQuantity));

    setRandomLocationIds(randomLocationIds);
    setRandomCharactersIds(charactersIds);

    setIsFormSubmitted(true);
    toast.success(`Episode generated with ${charactersQuantity} characters and ${locationsQuantity} locations! :)`);
  }

  return(
    <>
      <form className={styles.formWrapper} onSubmit={getData}>
        <fieldset>
          <legend>Episode info</legend>

          <label htmlFor="characters">Number of characters</label>
          <input id="characters" type="number" min="1" max="12" defaultValue="1" ref={charactersRef} placeholder="Number of characters"/>

          <label htmlFor="locations">Number of locations</label>
          <input id="locations" type="number" min="1" max="12" defaultValue="1" ref={locationsRef} placeholder="Number of locations"/>
          <button type="submit">Generate episode</button>
        </fieldset>
      </form>
    </>
  );
}