import { memo, useContext } from 'react';
import styles from '../styles.module.scss';
import AsideCard from './AsideCard';
import { Context } from '../../Layout';

function AsideCards() {
  const { cards } = useContext(Context);

  return (
    <div className={styles.asideCards}>
      <div className={styles.asideCardsWrapper}>
        {cards?.map((item) => (
          <AsideCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default memo(AsideCards);
