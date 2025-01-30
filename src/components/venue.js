import React from 'react'

import { getTranslations } from '../i18/translations'


  const Venue = ({locale}) => {
  const translations = getTranslations(locale);

  return (
    <div className='lg:flex items-center justify-between'>
    <div className='hidden lg:block lg:w-1/2 p-10 mx-auto opacity-70'>
      
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/images/gallery/photo.jpg" alt=""></img>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/images/gallery/photo1.jpg" alt=""></img>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/images/gallery/photo2.jpg" alt=""></img>
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/images/gallery/photo10.jpg" alt=""></img>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/images/gallery/photo4.jpg" alt=""></img>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/images/gallery/photo5.jpg" alt=""></img>
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/images/gallery/photo6.jpg" alt=""></img>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/images/gallery/animation.gif" alt=""></img>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/images/gallery/photo3.jpg" alt=""></img>
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/images/gallery/photo8.jpg" alt=""></img>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/images/gallery/photo7.jpg" alt=""></img>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/images/gallery/photo9.jpg" alt=""></img>
        </div>
    </div>
</div>

    </div>
    <div className='mx-auto max-w-md'>
        <div className='text-center items-center object-center font-poppins'>
          <h2 className="text-6xl font-bold text-amber-500 font-niconne">
            {translations.venue.greeting}
            
          </h2>
          <img src='/images/separator.png' className='opacity-70 inline m-4'></img>
          <p className="m-4 mb-3 justify-center text-center font-poppins">{translations.venue.description}</p>
          
          
<div className="opacity-80 max-w-sm p-6 mx-auto bg-rose-50 shadow-lg rounded-lg shadow">
    <a>
        <img className="rounded-t-lg" src="/images/villefermoy.png" alt="" />
    </a>
    <div className="p-5">
        <a>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">{translations.venue.place}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-800 dark:text-gray-600">{translations.venue.address}, {translations.venue.country}</p>
    <a href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47ef599eb2c4aa1f:0x214d8eabbaa52bfa?sa=X&ved=1t:8290&ictx=111" target="_blank" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-rose-300">
        Google Maps
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
    </div>
</div>
        </div>
    </div>
    </div>
    
  );
}
export default Venue;
