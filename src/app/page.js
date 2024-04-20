'use client'
import Head from "@/components/head";
import Form from "@/components/form"
import Foot from "@/components/foot"
import { useSearchParams } from 'next/navigation'
import Countdown from "@/components/countdown";
import Venue from "@/components/venue";
import {NextUIProvider} from "@nextui-org/system";
import {Divider, Link} from "@nextui-org/react";
import '../style/divider.css'

export default function Home() {
  const query = useSearchParams().get('lang')
  const locale = query !== undefined ? query : 'fr'

  return (
    <NextUIProvider>
      <main>  
      <div className="flex flex-row-reverse bg-amber-50 font-raleway font-small">
        <Link className="opacity-50 mx-3" href="?lang=fr">
          FR
        </Link>
        <Link className="opacity-50 mx-3" href="?lang=en">
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
      <div className="bg-rose-50">
        <Form locale={locale}/>
      </div>
    </main>
    </NextUIProvider>
  );
}
