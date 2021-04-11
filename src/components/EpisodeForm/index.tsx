import { FormEvent, RefObject, useCallback } from 'react';
import { toast } from 'react-toastify';

import { useCharacter } from '../../hooks/useCharacter';
import { useLocation } from '../../hooks/useLocation';
import { getRandomIds } from '../../utils/getRandomIds';

import styles from './styles.module.scss';

type EpisodeFormProps = {
  isFormAlreadySubmittted: boolean;
  setIsFormSubmitted(newValue: boolean): void;
};

export function EpisodeForm({
  isFormAlreadySubmittted,
  setIsFormSubmitted,
}: EpisodeFormProps) {
  const {
    charactersRef,
    maxCharactersId,
    setRandomCharactersIds,
  } = useCharacter();
  const { locationsRef, maxLocationId, setRandomLocationIds } = useLocation();

  const getData = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!charactersRef.current) {
        toast.error('charatersRef is null');
        return;
      }

      if (!locationsRef.current) {
        toast.error('locationsRef is null');
        return;
      }

      const charactersQuantity = charactersRef.current.value;
      const locationsQuantity = locationsRef.current.value;

      if (Number(charactersQuantity) < 1 || Number(charactersQuantity) > 12) {
        toast.error('Characters must be within 1 and 12');
        return;
      }

      if (Number(locationsQuantity) < 1 || Number(locationsQuantity) > 12) {
        toast.error('Locations must be within 1 and 12');
        return;
      }

      const randomLocationIds = getRandomIds(
        maxLocationId,
        Number(locationsQuantity),
      );
      const charactersIds = getRandomIds(
        maxCharactersId,
        Number(charactersQuantity),
      );

      setRandomLocationIds(randomLocationIds);
      setRandomCharactersIds(charactersIds);

      if (!isFormAlreadySubmittted) {
        setIsFormSubmitted(true);
      }

      toast.success(
        `Episode generated with ${charactersQuantity} characters and ${locationsQuantity} locations! :)`,
      );
    },
    [
      charactersRef,
      isFormAlreadySubmittted,
      locationsRef,
      maxCharactersId,
      maxLocationId,
      setIsFormSubmitted,
      setRandomCharactersIds,
      setRandomLocationIds,
    ],
  );

  function handleNumberChange(
    element: RefObject<HTMLInputElement>,
    direction: 'up' | 'down',
  ) {
    const elementExists = element.current;

    if (!elementExists) {
      toast.error('Element does not exists');
      return;
    }

    switch (direction) {
      case 'up':
        elementExists.stepUp();
        break;

      case 'down':
        elementExists.stepDown();
        break;

      default:
        toast.error('Invalid option provided');
        break;
    }
  }

  return (
    <>
      <form className={styles.formWrapper} onSubmit={getData}>
        <fieldset>
          <legend>Episode info</legend>

          <label htmlFor="characters">
            <p>Number of characters</p>
            <div className={styles.inputGroup}>
              <button
                type="button"
                onClick={() => handleNumberChange(charactersRef, 'down')}
              >
                -
              </button>
              <input
                id="characters"
                type="number"
                min="1"
                max="12"
                defaultValue="1"
                ref={charactersRef}
                placeholder="Number of characters"
              />
              <button
                type="button"
                onClick={() => handleNumberChange(charactersRef, 'up')}
              >
                +
              </button>
            </div>
          </label>

          <label htmlFor="locations">
            <p>Number of locations</p>
            <div className={styles.inputGroup}>
              <button
                type="button"
                onClick={() => handleNumberChange(locationsRef, 'down')}
              >
                -
              </button>
              <input
                id="locations"
                type="number"
                min="1"
                max="12"
                defaultValue="1"
                ref={locationsRef}
                placeholder="Number of locations"
              />
              <button
                type="button"
                onClick={() => handleNumberChange(locationsRef, 'up')}
              >
                +
              </button>
            </div>
          </label>

          <button className={styles.submitButton} type="submit">
            Generate episode
          </button>
        </fieldset>
      </form>
    </>
  );
}
