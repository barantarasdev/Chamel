import { memo, useContext } from 'react';
import styles from '../styles.module.scss';
import Avatar from '../../Avatar';
import { Context } from '../../Layout';

function ContentHeader() {
  const { currentCard } = useContext(Context);

  return (
    <div className={styles.contentHeader}>
      <Avatar url="icons/avatar.svg" />

      <p className={styles.contentHeaderTitle}>{currentCard?.title}</p>
    </div>
  );
}

export default memo(ContentHeader);
