import { memo, useContext } from 'react';
import styles from '../styles.module.scss';
import ContentMessages from './ContentMessages';
import ContentHeader from './ContentHeader';
import ContentMessagesFooter from './ContentMessagesFooter';
import { Context } from '../../Layout';

function Content() {
  const { messages } = useContext(Context);

  return (
    <div className={styles.content}>
      {messages && messages?.length ? (
        <>
          <ContentHeader />

          <div className={styles.contentMain}>
            <div className={styles.contentMainScroll}>
              <ContentMessages />
            </div>

            <ContentMessagesFooter />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default memo(Content);
