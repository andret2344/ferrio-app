import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import type {Holiday} from '../types/database';
import {HolidayCard} from './HolidayCard';
import * as React from 'react';

interface HolidayCarouselProps {
	readonly holidays: readonly Holiday[];
}

export function HolidayCarousel(props: HolidayCarouselProps): React.ReactElement {
	const {t} = useTranslation();
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		setCurrentIndex(0);
	}, [props.holidays]);

	function goToPrevious() {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? props.holidays.length - 1 : prevIndex - 1));
	}

	function goToNext() {
		setCurrentIndex((prevIndex) => (prevIndex === props.holidays.length - 1 ? 0 : prevIndex + 1));
	}

	const getDotClasses = (index: number) =>
		index === currentIndex
			? 'w-2 h-2 rounded-full transition-all duration-200 bg-gradient-to-r from-amber-600 to-orange-600 w-6 sm:w-8'
			: 'w-2 h-2 rounded-full transition-all duration-200 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500';

	const renderDot = (_: Holiday, index: number) => (
		<button
			key={index}
			onClick={() => setCurrentIndex(index)}
			className={getDotClasses(index)}
			aria-label={`Go to holiday ${index + 1}`}
		/>
	);

	if (props.holidays.length === 0) {
		return <div className='text-center py-12 text-gray-600 dark:text-gray-400'>{t('holiday.noHolidaysFound')}</div>;
	}

	function renderHoliday(): React.ReactElement {
		if (props.holidays.length <= 1) {
			return <></>;
		}
		return <>
			<button
				onClick={goToPrevious}
				className='absolute left-0 sm:left-2 md:left-0 top-8 sm:top-10 md:top-12 -translate-x-2 sm:-translate-x-3 md:-translate-x-4 lg:-translate-x-6 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 cursor-pointer'
				aria-label='Previous holiday'
			>
				<ChevronLeft className='w-5 h-5 sm:w-6 sm:h-6'/>
			</button>

			<button
				onClick={goToNext}
				className='absolute right-0 sm:right-2 md:right-0 top-8 sm:top-10 md:top-12 translate-x-2 sm:translate-x-3 md:translate-x-4 lg:translate-x-6 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 cursor-pointer'
				aria-label='Next holiday'
			>
				<ChevronRight className='w-5 h-5 sm:w-6 sm:h-6'/>
			</button>

			<div className='flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6'>{props.holidays.map(renderDot)}</div>
		</>;
	}

	return (
		<div className='relative px-2 sm:px-4 md:px-0'>
			<HolidayCard holiday={props.holidays[currentIndex]} />

			{renderHoliday()}
		</div>
	);
}
