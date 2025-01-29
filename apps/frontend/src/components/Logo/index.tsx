import { memo } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { GENERAL_ICON_SIZE } from '../../constants'

function Logo() {
  return (
    <div className={styles.logo}>
      <Image
        className={styles.logoImage}
        width={GENERAL_ICON_SIZE}
        height={GENERAL_ICON_SIZE}
        src="/icons/logo.svg"
        alt="Logo"
      />
    </div>
  )
}

export default memo(Logo)
