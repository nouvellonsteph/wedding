'use client'
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
  const lang = useSearchParams().get('lang')
  const inviteId = useSearchParams().get('inviteId')
  const locale = lang !== undefined ? lang : 'fr'

  return (
    <NextUIProvider>
      <main>  
      <div className="flex flex-row-reverse fixed top-4 right-4 z-50 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
        <Link 
          className={`mx-2 text-sm font-medium transition-all duration-200 hover:opacity-100 ${
            locale === 'fr' ? 'opacity-100' : 'opacity-50'
          }`} 
          href="?lang=fr"
        >
          FR
        </Link>
        <div className="text-gray-300 mx-1">|</div>
        <Link 
          className={`mx-2 text-sm font-medium transition-all duration-200 hover:opacity-100 ${
            locale === 'en' ? 'opacity-100' : 'opacity-50'
          }`} 
          href="?lang=en"
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
