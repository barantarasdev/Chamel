import { memo, ChangeEvent, useContext } from 'react'
import styles from '../styles.module.scss'
import { Context } from '../../Layout'
import { MESSAGE_INPUT_MAX_LENGTH, MESSAGE_INPUT_MIN_LENGTH } from '../../../../src/constants'

interface Props {
  value: string
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

function ContentMessagesFooterInput({ value, handleChange }: Props) {
  const { messageInputRef } = useContext(Context)

  return (
    <textarea
      className={styles.contentMessagesFooterInput}
      ref={messageInputRef}
      value={value}
      onChange={handleChange}
      placeholder="Message"
      maxLength={MESSAGE_INPUT_MAX_LENGTH}
      minLength={MESSAGE_INPUT_MIN_LENGTH}
      rows={1}
      autoFocus
    />
  )
}

export default memo(ContentMessagesFooterInput)
