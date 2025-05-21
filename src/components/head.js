import React from 'react';
import Image from 'next/image'
import { getTranslations } from '../i18/translations'

const Hero = ({ locale }) => {

  const translations = getTranslations(locale);
  return (
    <div className="h-screen w-full flex flex-col md:flex-row items-center justify-center md:justify-between">
      <div className='hidden md:block md:w-1/4 lg:w-1/3 transform transition-all duration-300 hover:scale-105'>
        <Image 
          src='/images/shape-1.png' 
          alt="Decorative shape"
          width={500}
          height={500}
          className='w-full opacity-60'
          priority={true}
        />
      </div>
      <div className='text-center w-full md:w-1/2 px-4 animate-fadeIn'>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-niconne mb-4">
          {translations.head.bride}
          <span className='text-rose-300'> & </span>
          {translations.head.groom}
        </h1>
        <p className="text-black font-italic font-poppins text-xl md:text-2xl mb-6">{translations.head.date}</p>
        <Image 
          src='/images/separator.png' 
          alt="Decorative separator"
          width={200}
          height={50}
          className='opacity-80 mx-auto mb-8 transition-all duration-300 hover:opacity-100'
          priority={true}
        />
        <a href="#form" className="inline-flex items-center px-5 py-3 text-base font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-rose-300 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
           aria-label="RSVP Now">
          {translations.form.submit}
        </a>
      </div>
      <div className='hidden md:block md:w-1/4 lg:w-1/3 transform transition-all duration-300 hover:scale-105'>
        <Image 
          src='/images/shape-2.png' 
          alt="Decorative shape"
          width={500}
          height={500}
          className='w-full opacity-60'
        />
      </div>
    </div>
  );
};

export default Hero;
