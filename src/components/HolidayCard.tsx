import * as React from 'react';
import type {FerrioHoliday} from '../types/api';
import {HolidayCountry} from './HolidayCountry';
import {HolidayDescription} from './HolidayDescription';
import {LearnMore} from './LearnMore';
import {UnusualBadge} from './UnusualBadge';

interface HolidayCardProps {
	readonly holiday: FerrioHoliday;
}

export function HolidayCard(props: HolidayCardProps): React.ReactElement {
	return (
		<div className='bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl px-10 py-8 md:px-14 md:py-12 mb-6 sm:mb-8 border border-gray-100 dark:border-gray-700 hover:shadow-3xl transition-shadow duration-300'>
			<h2 className='text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white wrap-break-word mb-3'>
				{props.holiday.name}
			</h2>

			<div className='flex items-center gap-2 mb-4 sm:mb-6'>
				<HolidayCountry holiday={props.holiday} />
				<UnusualBadge usual={props.holiday.usual} />
			</div>

			<HolidayDescription description={props.holiday.description} />
			<LearnMore url={props.holiday.url} />
		</div>
	);
}
