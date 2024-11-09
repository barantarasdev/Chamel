'use client';

import { memo, useContext, useEffect, useRef } from 'react';
import styles from '../styles.module.scss';
import ContentMessage from './ContentMessage';
import { Context } from '../../Layout';

function ContentMessages() {
  const { messages } = useContext(Context);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.contentMessages}>
      {messages?.map((item) => (
        <ContentMessage key={item.id} item={item} />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default memo(ContentMessages);
