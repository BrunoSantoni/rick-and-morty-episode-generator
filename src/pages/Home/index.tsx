import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Characters } from '../../components/Characters';
import { EpisodeForm } from '../../components/EpisodeForm';
import { Locations } from '../../components/Locations';

import { AppProvider } from '../../hooks';

import styles from './styles.module.scss';

export function Home() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <AppProvider>
      <section className={styles.homeWrapper}>
        <div className={styles.content}>
          <h1>Create your own Rick and Morty episode</h1>
          <EpisodeForm
            isFormAlreadySubmittted={isFormSubmitted}
            setIsFormSubmitted={setIsFormSubmitted}
          />
          {isFormSubmitted && (
            <>
              <Characters />
              <Locations />
            </>
          )}
        </div>
      </section>
      <ToastContainer autoClose={2000} />
    </AppProvider>
  );
}
