import Layout from '../components/Layout';
import { DEFAULT_LANGUAGE } from '../constants';
import { ROBOTO } from '../constants/font';
import '../styles/global.scss';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={DEFAULT_LANGUAGE}>
      <body className={ROBOTO.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

export default RootLayout;
