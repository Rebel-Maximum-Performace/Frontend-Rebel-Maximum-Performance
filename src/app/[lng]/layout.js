import localFont from 'next/font/local';
import '@/assets/styles/globals.css';
import ReactQueryWrapper from '../../lib/ReactQueryWrapper';
import { languages } from '../i18n/setting';
import { dir } from 'i18next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import WebContextProvider from '@/context/WebContext';

const helvetica_light = localFont({
  src: '../../assets/fonts/Helvetica/Helvetica-Light.ttf',
  display: 'swap',
  variable: '--font-helvetica-light',
});
const helvetica_regular = localFont({
  src: '../../assets/fonts/Helvetica/Helvetica-Regular.ttf',
  display: 'swap',
  variable: '--font-helvetica-regular',
});
const helvetica_bold = localFont({
  src: '../../assets/fonts/Helvetica/Helvetica-Bold.ttf',
  display: 'swap',
  variable: '--font-helvetica-bold',
});

export const metadata = {
  title: 'Rebel Maximum Performance',
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const RootLayout = async ({ children, params }) => {
  const { lng } = await params;
  return (
    <html lang="en" dir={dir(lng)}>
      <body
        className={`antialiased ${helvetica_light.variable} ${helvetica_regular.variable} ${helvetica_bold.variable}`}
      >
        <ReactQueryWrapper>
          <NuqsAdapter>
            <WebContextProvider>{children}</WebContextProvider>
          </NuqsAdapter>
        </ReactQueryWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
