import { Niconne, Poppins, Raleway } from "next/font/google";
import "./globals.css";

const niconne = Niconne({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-niconne'
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-poppins'
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['200'],
  style: ['italic'],
  variable: '--font-raleway'
});

export const metadata = {
  title: "Alice & Stéphane",
  description: "Our wedding RSVP page",
  'og:image': "/image/gallery/photo4.jpg",
  'og:type': "website",
  'og:url': "https://wedding.aliceandstephane.site"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${niconne.variable} ${poppins.variable} ${raleway.variable}`}>
      <head>
        <meta property="og:url" content="https://wedding.aliceandstephane.site"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Alice & Stephane"/>
        <meta property="og:description" content="Our wedding RSVP page"/>
        <meta property="og:image" content="/images/gallery/photo4.jpg"/>
      </head>
      <body className={poppins.className}>{children}
      </body>
    </html>
  );
}
