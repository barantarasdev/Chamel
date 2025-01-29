import { PropsWithChildren } from 'react'
import Layout from '../components/Layout'
import '../styles/global.scss'
import { DEFAULT_LANGUAGE } from '../constants'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang={DEFAULT_LANGUAGE}>
      <body className={roboto.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}

export default RootLayout
