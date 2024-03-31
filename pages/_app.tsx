import '@/styles/globals.css';
import '@/styles/colors.css';
import type { AppProps } from 'next/app';
import Footer from '@/components/common/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
