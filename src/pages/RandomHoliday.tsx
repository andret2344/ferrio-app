import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshCw} from 'lucide-react';
import {ErrorMessage} from '../components/ErrorMessage';
import {Header} from '../components/Header';
import {HolidayCarousel} from '../components/HolidayCarousel';
import {Preloader} from '../components/Preloader';
import {Holiday} from '../types/database';
import {formatDate} from '../utils/dateFormatter';
import {fetchHolidaysByDate} from '../utils/ferrioApi';
import {getRandomDate} from '../utils/randomDate';
import {FerrioHoliday} from '../types/api.ts';
import * as React from 'react';

type ErrorKey = 'connectionError' | 'databaseError' | 'fetchFailed';

export function RandomHoliday(): React.ReactElement {
	const {i18n, t} = useTranslation();
	const lang = i18n.language.split('-')[0] as 'en' | 'pl';

	const [randomDate, setRandomDate] = useState<Date>(() => getRandomDate());
	const [holidays, setHolidays] = useState<Holiday[]>([]);
	const [loading, setLoading] = useState(true);
	const [errorKey, setErrorKey] = useState<ErrorKey | null>(null);

	useEffect(() => {
		const loadHolidays = async () => {
			setLoading(true);

			try {
				const month = randomDate.getMonth() + 1;
				const day = randomDate.getDate();

				const ferrioHolidays = await fetchHolidaysByDate(day, month, lang);

				const mappedHolidays: Holiday[] = ferrioHolidays.map((holiday: FerrioHoliday, index: number) => ({
					id: `${holiday.day}-${holiday.month}-${index}`,
					name: holiday.name,
					description: holiday.description || null,
					day: holiday.day,
					month: holiday.month,
					country: holiday.country,
					is_international: !holiday.country,
					created_at: new Date().toISOString()
				}));

				setHolidays(mappedHolidays);
				setErrorKey(null);
			} catch (error) {
				console.error('Error fetching holidays:', error);
				setErrorKey('connectionError');
			} finally {
				setLoading(false);
			}
		};

		loadHolidays();
	}, [randomDate, lang]);

	function refreshDate(): void {
		setRandomDate(getRandomDate());
	}

	function renderContent() {
		if (loading) {
			return <Preloader />;
		}

		if (errorKey) {
			return <ErrorMessage message={t(`error.${errorKey}`)} />;
		}

		return <HolidayCarousel holidays={holidays} />;
	}

	const formattedDate = formatDate(randomDate, lang);

	return (
		<main className='mb-16 sm:mb-20 md:mb-24'>
			<Header />

			<div className='mb-4 sm:mb-6 flex justify-center px-4'>
				<button
					onClick={refreshDate}
					className='flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 hover:from-amber-200 hover:to-orange-200 dark:hover:from-amber-900/50 dark:hover:to-orange-900/50 text-amber-800 dark:text-amber-300 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md'
				>
					<span>{formattedDate}</span>
					<RefreshCw className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
				</button>
			</div>

			{renderContent()}
		</main>
	);
}
