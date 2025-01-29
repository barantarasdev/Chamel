'use client'

import { ChangeEvent, memo, useCallback, useContext, useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import ContentMessagesFooterInput from './ContentMessagesFooterInput'
import { Context } from '../../Layout'
import Image from 'next/image'
import { socket } from '../../../../src/api/socketClient'

const ContentMessagesFooter = () => {
  const { messageInputRef } = useContext(Context)
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    socket.emit('message', {
      receiverId: '6a30456e-68f9-447a-b054-a3f1155cc655',
      text: '1231',
    })
    setMessage('')
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleKeyDown = useCallback(() => {
    if (messageInputRef?.current) {
      messageInputRef.current.focus()
    }
  }, [messageInputRef])

  useEffect(() => {
    if (messageInputRef?.current) {
      messageInputRef.current.style.height = 'auto'
      messageInputRef.current.style.height = `${messageInputRef.current.scrollHeight}px`
    }
  }, [message])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className={styles.contentMessagesFooter}>
      <div className={styles.contentMessagesFooterWrapper}>
        <ContentMessagesFooterInput value={message} handleChange={handleChange} />

        <button className={styles.contentMessagesFooterSendIconWrapper} onClick={sendMessage}>
          <Image src="/icons/logo.svg" width={35} height={35} alt="send icon" />
        </button>
      </div>
    </div>
  )
}

export default memo(ContentMessagesFooter)
