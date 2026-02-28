import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Calendar} from 'lucide-react';
import {useLang} from '../hooks/useLang';
import type {DayHolidays} from '../hooks/useUpcomingHolidays';
import {formatMonthDay} from '../utils/dateFormatter';
import {HolidayItem} from './HolidayItem';

interface UpcomingDayCardProps {
	readonly day: DayHolidays;
}

export function UpcomingDayCard(props: UpcomingDayCardProps): React.ReactElement {
	const {t} = useTranslation();
	const lang = useLang();
	const month = props.day.month;
	const dayNum = props.day.day;

	function getDaysLabel(days: number): string {
		if (days === 0) {
			return t('upcoming.today');
		}
		const absDays = Math.abs(days);
		if (days < 0) {
			return t('upcoming.daysAgo', {count: absDays});
		}
		return t('upcoming.inDays', {count: days});
	}

	return (
		<div className='bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300'>
			<div className='flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4'>
				<div className='shrink-0 p-2 sm:p-3 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg'>
					<Calendar className='w-5 h-5 sm:w-6 sm:h-6 text-amber-700 dark:text-amber-400' />
				</div>
				<div className='flex-1 min-w-0'>
					<div className='flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1'>
						<h3 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white wrap-break-word'>
							{formatMonthDay(dayNum, month, lang)}
						</h3>
						<span className='text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400'>
							{getDaysLabel(props.day.daysFromToday)}
						</span>
					</div>
					<div className='space-y-2 sm:space-y-3 mt-2 sm:mt-3'>
						{props.day.holidays.map((holiday, i) => (
							<HolidayItem
								key={i}
								holiday={holiday}
								month={month}
								day={dayNum}
								index={i}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
