import Layout from '../components/Layout';
import { StyledComponentsRegistry } from './registry';

export const metadata = {
  title: 'Welcome to Chamel',
  description: 'Chamel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Layout>{children}</Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
