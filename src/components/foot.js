import React from 'react';
import Image from "next/image";
import { getTranslations } from '../i18/translations'

const Hero = ({ locale }) => {

  const translations = getTranslations(locale);
  return (
    <div className="h-1/3 w-screen flex justify-between items-center">
      <div>
        <Image
          src='/images/shape-1.png'
          width={200}
          height={200}
          alt="Decorative shape left"
          className='opacity-70 bg-cover bg-position-top-left flex-shrink-0'
          priority
        />
      </div>
      <div className='text-center flex-grow-2'>
        <h2 className="text-6xl font-bold font-niconne">
          {translations.head.bride}
          <span className='text-rose-300'> & </span>
          {translations.head.groom}
        </h2>
        <p className="text-black font-italic font-poppins text-large">{translations.head.date}</p>
      </div>
      <div>
        <Image
          src='/images/shape-2.png'
          width={200}
          height={200}
          alt="Decorative shape right"
          className='opacity-70 bg-cover bg-position-bottom-right'
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
