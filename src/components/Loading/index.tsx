import loadingGif from '../../assets/loading.gif';

import styles from './styles.module.scss';

export function Loading() {
  return(
    <img className={styles.imgContent} src={loadingGif} alt="Portal do Ricky &amp; Morty girando, indicando que o conteúdo está carregando" />
  );
}