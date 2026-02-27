import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Calendar, ChevronLeft, ChevronRight, X} from 'lucide-react';
import {ErrorMessage} from '../components/ErrorMessage';
import {Header} from '../components/Header';
import {Preloader} from '../components/Preloader';
import {formatDate} from '../utils/dateFormatter';
import {fetchHolidaysByDate} from '../utils/ferrioApi';
import {FerrioHoliday} from '../types/api.ts';

interface Holiday {
	readonly name: string;
	readonly description: string;
}

interface DayHolidays {
	readonly date: Date;
	readonly daysFromToday: number;
	readonly holidays: Holiday[];
}

function getDaysLabel(days: number, language: string): string {
	if (days === 0) {
		if (language === 'pl') {
			return 'Dzisiaj';
		}
		return 'Today';
	}

	if (days < 0) {
		const absDays = Math.abs(days);
		if (absDays === 1) {
			if (language === 'pl') {
				return '1 dzień temu';
			}
			return '1 day ago';
		}
		if (language === 'pl') {
			return `${absDays} dni temu`;
		}
		return `${absDays} days ago`;
	}

	if (days === 1) {
		if (language === 'pl') {
			return 'Za 1 dzień';
		}
		return 'In 1 day';
	}

	if (language === 'pl') {
		return `Za ${days} dni`;
	}

	return `In ${days} days`;
}

async function fetchUpcomingHolidays(startDate: Date, language: string): Promise<DayHolidays[]> {
	const holidays: DayHolidays[] = [];
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	for (let i = 0; i < 7; i++) {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);
		date.setHours(0, 0, 0, 0);

		const month = date.getMonth() + 1;
		const day = date.getDate();

		try {
			const ferrioHolidays = await fetchHolidaysByDate(day, month, language);

			const dayHolidays: Holiday[] = ferrioHolidays.map((holiday: FerrioHoliday) => ({
				name: holiday.name,
				description: holiday.description || ''
			}));

			const diffTime = date.getTime() - today.getTime();
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

			holidays.push({
				date,
				daysFromToday: diffDays,
				holidays: dayHolidays
			});
		} catch (error) {
			console.error(`Error fetching holidays for ${day}/${month}:`, error);
		}
	}

	return holidays;
}

function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) {
		return text;
	}
	return text.slice(0, maxLength).trim() + '...';
}

export function Upcoming() {
	const {i18n, t} = useTranslation();
	const lang = i18n.language.split('-')[0] as 'en' | 'pl';
	const [weekOffset, setWeekOffset] = useState(0);
	const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
	const [upcomingHolidays, setUpcomingHolidays] = useState<DayHolidays[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadHolidays = async () => {
			setLoading(true);
			setError(null);

			try {
				const startDate = new Date();
				startDate.setDate(startDate.getDate() + weekOffset * 7);

				const holidays = await fetchUpcomingHolidays(startDate, lang);
				setUpcomingHolidays(holidays);
			} catch (err) {
				console.error('Error loading upcoming holidays:', err);
				setError(t('error.connectionError'));
			} finally {
				setLoading(false);
			}
		};

		loadHolidays();
	}, [weekOffset, lang, t]);

	const renderDayCard = (day: DayHolidays, index: number) => (
		<div
			key={index}
			className='bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300'
		>
			<div className='flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4'>
				<div className='shrink-0 p-2 sm:p-3 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg'>
					<Calendar className='w-5 h-5 sm:w-6 sm:h-6 text-amber-700 dark:text-amber-400' />
				</div>
				<div className='flex-1 min-w-0'>
					<div className='flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1'>
						<h3 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white wrap-break-word'>
							{formatDate(day.date, lang)}
						</h3>
						<span className='text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400'>
							{getDaysLabel(day.daysFromToday, lang)}
						</span>
					</div>
					<div className='space-y-2 sm:space-y-3 mt-2 sm:mt-3'>{day.holidays.map(renderHolidayItem)}</div>
				</div>
			</div>
		</div>
	);

	const renderHolidayItem = (holiday: Holiday, holidayIndex: number) => {
		const hasDescription = holiday.description.length > 0;
		const Element = hasDescription ? 'button' : 'div';

		const itemClasses = hasDescription
			? 'w-full text-left p-2 sm:p-3 rounded-lg transition-all duration-200 group border border-transparent hover:bg-amber-50 dark:hover:bg-gray-700/50 hover:border-amber-200 dark:hover:border-amber-800 cursor-pointer'
			: 'w-full text-left p-2 sm:p-3 rounded-lg transition-all duration-200 group border border-transparent';

		const dotClasses = hasDescription
			? 'w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 group-hover:scale-125 transition-transform'
			: 'w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500';

		const nameClasses = hasDescription
			? 'font-medium text-sm sm:text-base text-gray-900 dark:text-white break-words group-hover:text-amber-600 dark:group-hover:text-amber-400'
			: 'font-medium text-sm sm:text-base text-gray-900 dark:text-white break-words';

		return (
			<Element
				key={holidayIndex}
				onClick={hasDescription ? () => setSelectedHoliday(holiday) : undefined}
				className={itemClasses}
			>
				<div className='flex items-start gap-2 mb-1'>
					<div className={dotClasses}></div>
					<span className={nameClasses}>{holiday.name}</span>
				</div>
				{hasDescription && (
					<p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-3.5 sm:ml-4 leading-relaxed'>
						{truncateText(holiday.description, 100)}
					</p>
				)}
			</Element>
		);
	};

	return (
		<main className='mb-16 sm:mb-20 md:mb-24 px-4'>
			<Header />

			<div className='mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-4'>
				<button
					onClick={() => setWeekOffset(weekOffset - 1)}
					className='flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-semibold rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-105'
				>
					<ChevronLeft className='w-4 h-4 sm:w-5 sm:h-5' />
					<span className='hidden sm:inline'>Previous Week</span>
					<span className='sm:hidden'>Prev</span>
				</button>
				<button
					onClick={() => setWeekOffset(weekOffset + 1)}
					className='flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-semibold rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-105'
				>
					<span className='hidden sm:inline'>Next Week</span>
					<span className='sm:hidden'>Next</span>
					<ChevronRight className='w-4 h-4 sm:w-5 sm:h-5' />
				</button>
			</div>

			{loading && <Preloader />}

			{error && <ErrorMessage message={error} />}

			{!loading && !error && selectedHoliday && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'
					onClick={() => setSelectedHoliday(null)}
				>
					<div
						className='bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto'
						onClick={(e) => e.stopPropagation()}
					>
						<div className='sticky top-0 bg-linear-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 border-b-2 border-amber-200 dark:border-gray-700 p-4 sm:p-6'>
							<div className='flex items-start justify-between'>
								<h2 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white pr-8'>
									{selectedHoliday.name}
								</h2>
								<button
									onClick={() => setSelectedHoliday(null)}
									className='shrink-0 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
									aria-label='Close modal'
								>
									<X className='w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400' />
								</button>
							</div>
						</div>
						<div className='p-4 sm:p-6'>
							<p className='text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg'>
								{selectedHoliday.description}
							</p>
						</div>
					</div>
				</div>
			)}

			{!loading && !error && <div className='space-y-4 sm:space-y-6'>{upcomingHolidays.map(renderDayCard)}</div>}
		</main>
	);
}
