import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import 'node_modules/react-modal-video/css/modal-video.css';
import '../../styles/index.css';
import { draftMode } from 'next/headers';
import Head from '../[lng]/Head';
import { ResponsiveImage, SiteLocale } from '@/graphql/generated';
import { Inter } from 'next/font/google';
import getAvailableLocales from '../i18n/settings';
import GetMenuData, { Menu } from '@/components/Header/GetMenuData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

type Params = {
  children: React.ReactNode;
  params: {
    lng: SiteLocale;
  };
};

export async function generateStaticParams() {
  const languages = await getAvailableLocales();
  return languages.map((language) => {
    language;
  });
}

export default async function RootLayout({
  children,
  params: { lng },
}: Params) {
  const { isEnabled } = draftMode();
  const { menuData, logoImage, notificationStripObject, headerDisplayOption } =
    await GetMenuData(lng, isEnabled);
  const languages = await getAvailableLocales();

  return (
    <>
      <Header
        lng={lng}
        isDraft={isEnabled}
        menuData={menuData as Menu[]}
        logoImage={logoImage as string}
        availableLocales={languages}
        notificationStripObject={notificationStripObject}
      />
      {children}
      <Footer lng={lng} />
      <ScrollToTop lng={lng} isDraft={isEnabled} />
    </>
  );
}
