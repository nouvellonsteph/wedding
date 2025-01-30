'use client'
import { useState, useEffect } from 'react';
import Head from "@/components/head";
import Form from "@/components/form"
import Foot from "@/components/foot"
import Menu from "@/components/menu";
import { useSearchParams } from 'next/navigation'
import Countdown from "@/components/countdown";
import Venue from "@/components/venue";
import {NextUIProvider} from "@nextui-org/system";
import {Divider, Link} from "@nextui-org/react";
import '../style/divider.css'

export default function Home() {
  const [locale, setLocale] = useState(() => {
    return 'en';
  });

  useEffect(() => {
    // Save the current language state to localStorage
    localStorage.setItem('wedding-locale', locale);
  }, [locale]);

  // For backwards compatibility, you might want to keep this:
  const inviteId = useSearchParams().get('inviteId');

  return (
    <NextUIProvider>
      <main>  
      <div className="flex flex-row-reverse fixed top-4 right-4 z-50 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
        <Link 
          className={`mx-2 text-sm font-medium transition-all duration-200 hover:opacity-100 cursor-pointer ${
            locale === 'fr' ? 'opacity-100' : 'opacity-50'
          }`} 
          onClick={() => setLocale('fr')}
        >
          FR
        </Link>
        <div className="text-gray-300 mx-1">|</div>
        <Link 
          className={`mx-2 text-sm font-medium transition-all duration-200 hover:opacity-100 cursor-pointer ${
            locale === 'en' ? 'opacity-100' : 'opacity-50'
          }`} 
          onClick={() => setLocale('en')}
        >
          EN
        </Link>
      </div>
      <div className="bg-amber-50">
        <Head locale={locale}/>
      </div>
      <img src="/images/wavesOpacityAmber.svg" className="bg-rose-50 w-screen"></img>
      <div className="bg-rose-50" >
        <Countdown locale={locale}/>
      </div>
      <img src="/images/wavesOpacityRose.svg" className="bg-amber-50 w-screen"></img>
      <div className="bg-amber-50">
        <Venue locale={locale}/>
      </div>
      <img src="/images/wavesOpacityAmber.svg" className="bg-rose-50 w-screen"></img>
      <div className="bg-rose-50" >
        <Menu locale={locale}/>
      </div>
      <img src="/images/wavesOpacityRose.svg" className="bg-amber-50 w-screen"></img>
      <div className="bg-amber-50">
        <Form id="form" locale={locale} inviteId={inviteId}/>
      </div>
    </main>
    </NextUIProvider>
  );
}
