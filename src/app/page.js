'use client'
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Head from "@/components/head";
import FormWrapper from "@/components/formWrapper"
import Foot from "@/components/foot"
import Menu from "@/components/menu";
import Countdown from "@/components/countdown";
import Venue from "@/components/venue";
import {NextUIProvider} from "@nextui-org/system";
import {Divider, Link} from "@nextui-org/react";
import '../style/divider.css'

export default function Home() {
  const [locale, setLocale] = useState('en');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    try {
      // Try to get the locale from localStorage first
      const savedLocale = localStorage.getItem('wedding-locale');
      if (savedLocale && ['en', 'fr'].includes(savedLocale)) {
        setLocale(savedLocale);
        return;
      }

      // If no saved locale, try to detect from browser
      if (typeof window !== 'undefined' && window.navigator) {
        const acceptLanguage = navigator.languages
          ? navigator.languages.join(',')
          : navigator.language;

        const preferredLanguage = acceptLanguage
          .split(',')
          .map(lang => lang.split(';')[0].split('-')[0].toLowerCase())
          .find(lang => ['en', 'fr'].includes(lang));

        if (preferredLanguage) {
          setLocale(preferredLanguage);
          localStorage.setItem('wedding-locale', preferredLanguage);
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []); // Run once on mount

  // Update localStorage whenever locale changes
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('wedding-locale', locale);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [locale, isClient]);

  return (
    <NextUIProvider>
      <main>  
      <div className="flex flex-row-reverse fixed top-4 right-4 z-50 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
        <Link 
          className={`mx-2 text-sm font-medium transition-all duration-200 hover:opacity-100 cursor-pointer ${
            locale === 'fr' ? 'opacity-100' : 'opacity-50'
          }`} 
          onClick={() => {
            setLocale('fr');
            try {
              localStorage.setItem('wedding-locale', 'fr');
            } catch (error) {
              console.error('Error saving locale:', error);
            }
          }}
        >
          FR
        </Link>
        <div className="text-gray-300 mx-1">|</div>
        <Link 
          className={`mx-2 text-sm font-medium transition-all duration-200 hover:opacity-100 cursor-pointer ${
            locale === 'en' ? 'opacity-100' : 'opacity-50'
          }`} 
          onClick={() => {
            setLocale('en');
            try {
              localStorage.setItem('wedding-locale', 'en');
            } catch (error) {
              console.error('Error saving locale:', error);
            }
          }}
        >
          EN
        </Link>
      </div>
      <div className="bg-amber-50">
        <Head locale={locale}/>
      </div>
      <Image
        src="/images/wavesOpacityAmber.svg"
        alt="Wave divider"
        width={1920}
        height={100}
        priority={true}
        className="bg-rose-50 w-screen"
      />
      <div className="bg-rose-50" >
        <Countdown locale={locale}/>
      </div>
      <Image
        src="/images/wavesOpacityRose.svg"
        alt="Wave divider"
        width={1920}
        height={100}
        className="bg-amber-50 w-screen"
      />
      <div className="bg-amber-50">
        <Venue locale={locale}/>
      </div>
      <Image
        src="/images/wavesOpacityAmber.svg"
        alt="Wave divider"
        width={1920}
        height={100}
        className="bg-rose-50 w-screen"
      />
      <div className="bg-rose-50" >
        <Menu locale={locale}/>
      </div>
      <Image
        src="/images/wavesOpacityRose.svg"
        alt="Wave divider"
        width={1920}
        height={100}
        className="bg-amber-50 w-screen"
      />
      <div className="bg-amber-50">
        <Suspense fallback={<div>Loading...</div>}>
          <FormWrapper locale={locale} />
        </Suspense>
      </div>
    </main>
    </NextUIProvider>
  );
}
