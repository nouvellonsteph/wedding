import React from 'react';
import Image from 'next/image'
import { getTranslations } from '../i18/translations'

const Hero = ({ locale }) => {

  const translations = getTranslations(locale);
  return (
    <div className="h-screen w-screen flex items-center justify-between">
      <div className='invisible flex-shrink'>
        <Image 
          src='/images/shape-1.png' 
          alt="Decorative shape"
          width={500}
          height={500}
          className='md:visible w-div opacity-60'
        />
      </div>
      <div className='text-center w-1/2'>
        <h2 className="text-6xl font-bold font-niconne">
          {translations.head.bride}
          <span className='text-rose-300'> & </span>
          {translations.head.groom}
        </h2>
        <p className="text-black font-italic font-poppins text-large">{translations.head.date}</p>
        <Image 
          src='/images/separator.png' 
          alt="Decorative separator"
          width={200}
          height={50}
          className='opacity-70 bg-position-center mx-auto m-4'
        />
        <a href="#form" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-rose-300">{translations.form.submit}</a>
      </div>
      <div className='invisible flex-shrink'>
        <Image 
          src='/images/shape-2.png' 
          alt="Decorative shape"
          width={500}
          height={500}
          className='md:visible w-div opacity-60'
        />
      </div>
    </div>
  );
};

export default Hero;