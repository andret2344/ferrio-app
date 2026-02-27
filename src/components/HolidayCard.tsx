import {useTranslation} from 'react-i18next';
import {Globe} from 'lucide-react';
import type {Holiday} from '../types/database';
import {getCountryFlag, getCountryName} from '../utils/countryFlags';
import * as React from 'react';

interface HolidayCardProps {
	readonly holiday: Holiday;
}

export function HolidayCard(props: HolidayCardProps): React.ReactElement {
	const {t} = useTranslation();

	function renderCountry(): React.ReactElement {
		if (props.holiday.country) {
			return <>
				<span className='text-xl sm:hidden'>{getCountryFlag(props.holiday.country)}</span>
				<span className='text-sm text-gray-600 dark:text-gray-400'>
					{getCountryName(props.holiday.country)}
				</span>
			</>;
		} else {
			return <>
				<Globe className='w-4 h-4 text-gray-500 dark:text-gray-400 sm:hidden'/>
				<span className='text-sm text-gray-600 dark:text-gray-400'>{t('holiday.international')}</span>
			</>;
		}
	}

	function renderHolidayDescription(): React.ReactElement {
		if (!props.holiday.description) {
			return <></>;
		}
		const paragraphs = props.holiday.description.split('\n').filter(p => p.trim() !== '');

		function renderParagraph(paragraph: string, index: number): React.ReactElement {
			return <p key={index} className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
				{paragraph}
			</p>;
		}

		return <div className='flex flex-col gap-3'>{paragraphs.map(renderParagraph)}</div>;
	}

	return (
		<div className='bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl px-10 py-8 md:px-14 md:py-12 mb-6 sm:mb-8 border border-gray-100 dark:border-gray-700 hover:shadow-3xl transition-shadow duration-300'>
			<h2 className='text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white wrap-break-word mb-3'>
				{props.holiday.name}
			</h2>

			<div className='flex items-center gap-2 mb-4 sm:mb-6'>
				{renderCountry()}
			</div>

			{renderHolidayDescription()}
		</div>
	);
}
