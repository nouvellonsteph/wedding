import React from 'react';
import Image from 'next/image';
import { getTranslations } from '../i18/translations';

export default function Footer({ locale = 'en' }) {
  const translations = getTranslations(locale);
  
  return (
    <footer className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-8">
          <h3 className="text-3xl font-niconne mb-2">Alice & Stéphane</h3>
          <p className="text-center text-gray-600 max-w-md mb-6">
            {translations.footer.thankYou}
          </p>
          <div className="flex gap-6 mb-8">
            <a 
              href="mailto:wedding@aliceandstephane.site" 
              className="text-amber-600 hover:text-amber-800 transition-colors"
              aria-label={translations.footer.emailUs}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a 
              href="https://maps.app.goo.gl/FtL7LPREDYjLxMMy5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-600 hover:text-amber-800 transition-colors"
              aria-label={translations.footer.viewVenue}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Alice & Stéphane | <a href="#form" className="text-amber-600 hover:text-amber-800 transition-colors">{translations.footer.rsvpLink}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
