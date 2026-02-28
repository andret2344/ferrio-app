import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {ErrorMessage} from '../components/ErrorMessage';
import {Header} from '../components/Header';
import {Preloader} from '../components/Preloader';
import {UpcomingDayCard} from '../components/UpcomingDayCard';
import {useUpcomingHolidays} from '../hooks/useUpcomingHolidays';
import {parseIntParam} from '../utils/parseParam';

export function Upcoming(): React.ReactElement {
	const {t} = useTranslation();
	const navigate = useNavigate();
	const {week} = useParams<{week: string}>();
	const weekOffset = parseIntParam(week, 0);
	const {holidays, loading, error} = useUpcomingHolidays(weekOffset);

	function setWeekOffset(offset: number): void {
		navigate(`/upcoming/${offset}`);
	}

	let content: React.ReactElement;
	if (loading) {
		content = <Preloader />;
	} else if (error) {
		content = <ErrorMessage message={error} />;
	} else {
		content = (
			<div className='space-y-4 sm:space-y-6'>
				{holidays.map((day, i) => (
					<UpcomingDayCard
						key={i}
						day={day}
					/>
				))}
			</div>
		);
	}

	return (
		<main className='mb-16 sm:mb-20 md:mb-24 px-4'>
			<Header />

			<div className='mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-4'>
				<button
					onClick={() => setWeekOffset(weekOffset - 1)}
					className='flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-semibold rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-105'
				>
					<ChevronLeft className='w-4 h-4 sm:w-5 sm:h-5' />
					<span className='hidden sm:inline'>{t('upcoming.prevWeek')}</span>
					<span className='sm:hidden'>{t('upcoming.prev')}</span>
				</button>

				<button
					onClick={() => setWeekOffset(0)}
					disabled={weekOffset === 0}
					className='px-3 py-2 sm:px-4 text-sm sm:text-base font-semibold rounded-lg shadow transition-all duration-200 border-2 border-amber-400 dark:border-amber-600 text-amber-700 dark:text-amber-400 bg-white dark:bg-gray-800 hover:shadow-lg hover:scale-105 disabled:opacity-40 disabled:cursor-default disabled:hover:scale-100 disabled:hover:shadow'
				>
					{t('upcoming.today')}
				</button>

				<button
					onClick={() => setWeekOffset(weekOffset + 1)}
					className='flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-semibold rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-105'
				>
					<span className='hidden sm:inline'>{t('upcoming.nextWeek')}</span>
					<span className='sm:hidden'>{t('upcoming.next')}</span>
					<ChevronRight className='w-4 h-4 sm:w-5 sm:h-5' />
				</button>
			</div>

			{content}
		</main>
	);
}
