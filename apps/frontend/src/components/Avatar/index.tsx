import { memo } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { GENERAL_ICON_SIZE } from '../../constants'

interface Props {
  url: string
}

function Avatar({ url }: Props) {
  return (
    <div className={styles.avatar}>
      <Image
        className={styles.avatarImage}
        width={GENERAL_ICON_SIZE}
        height={GENERAL_ICON_SIZE}
        src={url}
        alt="Avatar"
      />
    </div>
  )
}

export default memo(Avatar)
