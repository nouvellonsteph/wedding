'use client'
import React from "react";
import Image from 'next/image';
import { getTranslations } from '../i18/translations'

const Menu = ({ locale }) => {
	const translations = getTranslations(locale);

	return (
		<div className='py-16'>
			<h2 className="text-center px-4 font-niconne font-bold text-5xl md:text-6xl mb-4">{translations.menu.abstract}</h2>
			<Image 
				src='/images/separator.png'
				width={200}
				height={30}
				alt="Decorative separator"
				className='opacity-80 hover:opacity-100 transition-all duration-300 mx-auto mb-12'
				priority
			/>
			<div className='p-4 font-poppins'>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="border-l-4 border-amber-300 rounded-lg overflow-hidden shadow-lg bg-white">
						{[
							'arrival',
							'welcome',
							'ceremony',
							'cocktail',
							'dinner',
							'party'
						].map((event, idx) => (
							<div key={event} className={`transition-all duration-300 hover:bg-amber-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-rose-50'}`}>
								<div className="flex flex-col md:flex-row border-b border-gray-200">
									<div className="md:w-1/3 p-6 flex items-center justify-center md:justify-end">
										<div className="text-right">
											<h3 className="text-xl font-semibold text-rose-800">{translations.menu[event][0]}</h3>
										</div>
									</div>
									<div className="md:w-2/3 p-6">
										<p className="text-gray-700 text-lg">{translations.menu[event][1]}</p>
										<p className="text-sm text-gray-500 mt-3 italic">{translations.menu[event][2]}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu;
