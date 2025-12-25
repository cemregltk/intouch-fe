import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";
import { getSiteSettings, getSEOSettings } from "@/lib/payload/queries";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, seoSettings] = await Promise.all([
    getSiteSettings(),
    getSEOSettings(),
  ])

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const siteName = siteSettings?.siteName || 'Wellbeing'
  const siteDescription = seoSettings?.defaultMetaDescription || siteSettings?.siteDescription || 'Kurumsal wellbeing çözümleri, eğitimler ve danışmanlık hizmetleri'
  const ogImage = seoSettings?.ogImage && typeof seoSettings.ogImage === 'object' && seoSettings.ogImage.url
    ? seoSettings.ogImage.url
    : `${baseUrl}/og-image.jpg`

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: seoSettings?.defaultMetaTitle || `${siteName} - İş, İnsan, Psikoloji`,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    keywords: ["wellbeing", "kurumsal eğitim", "psikoloji", "iş hayatı", "wellbeing eğitimleri"],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: baseUrl,
      siteName,
      title: seoSettings?.defaultMetaTitle || `${siteName} - İş, İnsan, Psikoloji`,
      description: siteDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: seoSettings?.twitterCard || 'summary_large_image',
      title: seoSettings?.defaultMetaTitle || `${siteName} - İş, İnsan, Psikoloji`,
      description: siteDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: baseUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings()
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  return (
    <html lang="tr">
      <head>
        <StructuredData
          type="Organization"
          data={{
            name: siteSettings?.siteName || 'Wellbeing',
            description: siteSettings?.siteDescription,
            logo: siteSettings?.logo && typeof siteSettings.logo === 'object' ? siteSettings.logo.url : undefined,
            email: siteSettings?.contactEmail,
            phone: siteSettings?.contactPhone,
            socialLinks: siteSettings?.socialLinks,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
