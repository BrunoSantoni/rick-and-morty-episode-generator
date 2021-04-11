import defaultLoadingGif from '../../assets/loading.gif';
// import rickLoadingGif from '../../assets/rick-loading.gif';
import rickLoadingGif2 from '../../assets/rick-loading-2.gif';

import styles from './styles.module.scss';

type LoadingProps = {
  screen: string;
};

export function Loading({ screen = 'default' }: LoadingProps) {
  let loadingGif: string;

  switch (screen) {
    case 'characters':
      loadingGif = rickLoadingGif2;
      break;

    case 'locations':
      loadingGif = defaultLoadingGif;
      break;

    default:
      loadingGif = defaultLoadingGif;
      break;
  }

  return (
    <img
      className={styles.imgContent}
      src={loadingGif}
      alt="Portal do Ricky &amp; Morty girando, indicando que o conteúdo está carregando"
    />
  );
}
