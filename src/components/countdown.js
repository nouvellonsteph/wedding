'use client'
import React, { useState, useEffect } from "react";
import '../style/countdown.css'
import { getTranslations } from '../i18/translations'

const COUNTDOWN_TARGET = new Date("2025-07-19T16:59:59");


const getTimeLeft = () => {
	const totalTimeLeft = COUNTDOWN_TARGET - new Date();
	const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
	const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
	const seconds = Math.floor((totalTimeLeft / 1000) % 60);
	return { days, hours, minutes, seconds };
};

const Countdown = ({ locale }) => {
	const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());
	const translations = getTranslations(locale);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(getTimeLeft());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className='countdown'>
			<h2 className="text-center font-niconne font-bold">{translations.countdown.greeting}</h2>
			<img src='/images/separator.png' className='opacity-70 bg-position-center mx-auto m-4'></img>
			<div className='p-4 content font-poppins text-2xl'>
				{Object.entries(timeLeft).map((el) => {
					let i = 1;
					const label = translations.countdown[el[0]];
					const value = el[1];
					i++
					return (
						<div className='box text-xs' key={label}>
							<div className='value'>
								<span>{value}</span>
							</div>
							<span className='label text-xs'> {label} </span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Countdown;