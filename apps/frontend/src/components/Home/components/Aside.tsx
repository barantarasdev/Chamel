import { memo } from 'react';
import styles from '../styles.module.scss';
import AsideHeader from './AsideHeader';
import AsideCards from './AsideCards';

function Aside() {
  return (
    <aside className={styles.aside}>
      <AsideHeader />
      <AsideCards />
    </aside>
  );
}

export default memo(Aside);
