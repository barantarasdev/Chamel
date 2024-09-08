import { PropsWithChildren } from 'react';
import Header from '../Header';
import Footer from '../Footer';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
