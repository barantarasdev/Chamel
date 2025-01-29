'use client'

import { memo, useCallback, useContext, useMemo } from 'react'
import styles from '../styles.module.scss'
import Avatar from '../../Avatar'
import clsx from 'clsx'
import { Context } from '../../Layout'

function AsideCard({ item }: any) {
  const { currentCard } = useContext(Context)

  const isActiveAsideCard = useMemo(() => {
    return currentCard?.id === item.id
  }, [currentCard?.id, item.id])

  const lastMessage = useMemo(() => {
    return item.messages[item.messages.length - 1].text
  }, [item.messages])

  const handleClick = useCallback(() => {
    window.location.hash = `#${item.id}`
  }, [item.id])

  return (
    <div
      className={clsx(styles.asideCard, isActiveAsideCard && styles.activeAsideCard)}
      onClick={handleClick}
      role="button"
    >
      <Avatar url="icons/avatar.svg" />

      <div className={styles.asideCardInfoWrapper}>
        <p className={styles.asideCardInfoTitle}>{item.title}</p>
        <p className={styles.asideCardInfoSubtitle}>{lastMessage}</p>
      </div>
    </div>
  )
}

export default memo(AsideCard)
