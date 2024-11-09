import { memo } from 'react';
import styles from '../styles.module.scss';
import Logo from '../../Logo';

function AsideHeader() {
  return (
    <div className={styles.asideHeader}>
      <Logo />
    </div>
  );
}

export default memo(AsideHeader);
