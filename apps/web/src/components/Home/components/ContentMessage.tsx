import { memo, useContext, useMemo } from 'react';
import styles from '../styles.module.scss';
import { MessageI } from '../../../types';
import clsx from 'clsx';
import { Context } from '../../Layout';

interface Props {
  item: MessageI;
}

function ContentMessage({ item }: Props) {
  const { user } = useContext(Context);

  const isCurrentUser = useMemo(() => {
    return user?.id === item.senderId;
  }, [item.senderId, user?.id]);

  return (
    <div
      className={clsx(
        styles.contentMessage,
        isCurrentUser && styles.activeContentMessage
      )}
    >
      <p className={styles.contentMessageIext}>{item.text}</p>
    </div>
  );
}

export default memo(ContentMessage);
