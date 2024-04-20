import React from 'react';
import { getTranslations } from '../i18/translations'

const Hero = ({ locale }) => {

  const translations = getTranslations(locale);
  return (
    <div className="h-screen w-screen flex items-center justify-between">
      <div className='invisible flex-shrink'>
        <img src='/images/shape-1.png' className='md:visible w-div opacity-60'></img>
      </div>
      <div className='text-center w-1/2'>
        <h2 className="text-6xl font-bold font-niconne">
          {translations.head.bride}
          <span className='text-rose-300'> & </span>
          {translations.head.groom}
        </h2>
        <p className="text-black font-italic font-poppins text-large">{translations.head.date}</p>
        <img src='/images/separator.png' className='opacity-70 bg-position-center mx-auto m-4'></img>
      </div>
      <div className='invisible flex-shrink'>
        <img src='/images/shape-2.png' className='md:visible w-div opacity-60'></img>
      </div>
    </div>
  );
};

export default Hero;