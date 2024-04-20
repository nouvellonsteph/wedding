import { Inter, Niconne, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alice & Stéphane",
  description: "Our wedding RSVP page",
  'og:image': "/image/gallery/photo4.jpg",
  'og:type': "website",
  'og:url': "https://wedding.aliceandstephane.site"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:url" content="https://wedding.aliceandstephane.site"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Alice & Stephane"/>
        <meta property="og:description" content="Our wedding RSVP page"/>
        <meta property="og:image" content="/images/gallery/photo4.jpg"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;1,300&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Niconne&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Niconne&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@1,242&display=swap" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>{children}
      </body>
    </html>
  );
}
