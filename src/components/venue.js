import React from 'react'
import Image from "next/image";
import { getTranslations } from '../i18/translations'

const Venue = ({locale}) => {
  const translations = getTranslations(locale);

  return (
    <div className='py-12'>
      <div className='text-center mb-8'>
        <h2 className="text-5xl md:text-6xl font-bold text-amber-500 font-niconne mb-4">
          {translations.venue.greeting}
        </h2>
        <Image
          src='/images/separator.png'
          width={150}
          height={30}
          alt="Decorative separator"
          className='opacity-70 mx-auto mb-6 transition-all duration-300 hover:opacity-100'
          priority
        />
        <p className="max-w-2xl mx-auto px-4 mb-6 text-base md:text-lg font-poppins">
          {translations.venue.description}
        </p>
      </div>
      
      <div className='lg:flex items-center justify-between max-w-7xl mx-auto'>
        <div className='lg:w-1/2 p-4 md:p-6 lg:p-10 mx-auto transition-opacity duration-300 hover:opacity-100 opacity-90'>
          <div className="relative rounded-xl overflow-hidden transform transition-all duration-300">
            <Image
              src="/images/drawing.png"
              alt="Wedding venue illustration"
              width={800}
              height={600}
              className="w-full object-cover rounded-xl"
              priority
            />
          </div>
        </div>
        <div className='mx-auto max-w-md px-4'>
          <div className='text-center font-poppins'>
            <div className="opacity-90 hover:opacity-100 transition-opacity duration-300 p-6 mx-auto bg-rose-50 rounded-xl shadow-lg">
              <Image
                src="/images/villefermoy.png"
                width={400}
                height={300}
                alt="Villefermoy venue"
                className="rounded-lg w-full hover:shadow-md transition-all duration-300"
                priority
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">{translations.venue.place}</h5>
                <p className="mb-5 font-normal text-gray-800">{translations.venue.address}, {translations.venue.country}</p>
                <a 
                  href="https://www.google.com/maps/search/Hotels/@48.5090004,2.846604,13z/data=!4m13!2m12!3m5!2sManoir+de+Villefermoy!3s0x47ef599eb2c4aa1f:0x214d8eabbaa52bfa!4m2!1d2.8982879!2d48.4834517!5m4!5m3!1s2025-08-09!4m1!1i2!6e3?entry=ttu&g_ep=EgoyMDI1MDEyNy4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Book hotel near venue"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-rose-300 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  {translations.venue.book}
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Venue;
