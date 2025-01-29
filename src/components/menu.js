'use client'
import React, { useState, useEffect } from "react";
import '../style/countdown.css'
import { getTranslations } from '../i18/translations'

const COUNTDOWN_TARGET = new Date("2025-08-09T14:00:00");


const getTimeLeft = () => {
	const totalTimeLeft = COUNTDOWN_TARGET - new Date();
	const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
	const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
	const seconds = Math.floor((totalTimeLeft / 1000) % 60);
	return { days, hours, minutes, seconds };
};

const Menu = ({ locale }) => {
	const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());
	const translations = getTranslations(locale);


	return (
		<div className='countdown'>
			<h2 className="text-center px-4 font-niconne font-bold">{translations.menu.abstract}</h2>
			<img src='/images/separator.png' className='opacity-70 bg-position-center mx-auto m-4'></img>
			<div className='p-4 content font-poppins'>
				<table className="table-auto text-md text-left w-full max-w-2xl mx-auto border-collapse">
					<tbody>
						<tr className="transition-colors">
							<td className="py-6 px-8 text-right w-1/3 text-rose-800 font-semibold">{translations.menu.arrival[0]}</td>
							<td className="py-6 px-8 text-gray-700">{translations.menu.arrival[1]}</td>
						</tr>
						<tr className="transition-colors">
							<td className="py-6 px-8 text-right w-1/3 text-rose-800 font-semibold">{translations.menu.welcome[0]}</td>
							<td className="py-6 px-8 text-gray-700">{translations.menu.welcome[1]}</td>
						</tr>
						<tr className="transition-colors">
							<td className="py-6 px-8 text-right w-1/3 text-rose-800 font-semibold">{translations.menu.ceremony[0]}</td>
							<td className="py-6 px-8 text-gray-700">{translations.menu.ceremony[1]}</td>
						</tr>
						<tr className="transition-colors">
							<td className="py-6 px-8 text-right w-1/3 text-rose-800 font-semibold">{translations.menu.cocktail[0]}</td>
							<td className="py-6 px-8 text-gray-700">{translations.menu.cocktail[1]}</td>
						</tr>
						<tr className="transition-colors">
							<td className="py-6 px-8 text-right w-1/3 text-rose-800 font-semibold">{translations.menu.dinner[0]}</td>
							<td className="py-6 px-8 text-gray-700">{translations.menu.dinner[1]}</td>
						</tr>
						<tr className="transition-colors">
							<td className="py-6 px-8 text-right w-1/3 text-rose-800 font-semibold">{translations.menu.party[0]}</td>
							<td className="py-6 px-8 text-gray-700">{translations.menu.party[1]}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Menu;