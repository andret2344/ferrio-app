import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Globe} from 'lucide-react';
import type {FerrioHoliday} from '../types/api';
import {getCountryFlag, getCountryName} from '../utils/countryFlags';

interface HolidayCountryProps {
	readonly holiday: FerrioHoliday;
}

export function HolidayCountry(props: HolidayCountryProps): React.ReactElement {
	const {t} = useTranslation();
	if (props.holiday.country) {
		return (
			<>
				<span className='text-xl sm:hidden'>{getCountryFlag(props.holiday.country)}</span>
				<span className='text-sm text-gray-600 dark:text-gray-400'>
					{getCountryName(props.holiday.country)}
				</span>
			</>
		);
	}
	return (
		<>
			<Globe className='w-4 h-4 text-gray-500 dark:text-gray-400 sm:hidden' />
			<span className='text-sm text-gray-600 dark:text-gray-400'>{t('holiday.international')}</span>
		</>
	);
}
