import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ErrorMessage} from '../components/ErrorMessage';
import {Header} from '../components/Header';
import {HolidayCarousel} from '../components/HolidayCarousel';
import {Preloader} from '../components/Preloader';
import {Holiday} from '../types/database';
import {getCurrentDate} from '../utils/dateFormatter';
import {FerrioHoliday} from '../types/api';
import {fetchHolidaysByDate} from '../utils/ferrioApi.ts';
import * as React from 'react';

type ErrorKey = 'connectionError' | 'databaseError' | 'fetchFailed';

export function Home(): React.ReactElement {
	const {i18n, t} = useTranslation();
	const lang = i18n.language.split('-')[0] as 'en' | 'pl';
	const currentDate = getCurrentDate(lang);
	const [holidays, setHolidays] = useState<Holiday[]>([]);
	const [loading, setLoading] = useState(true);
	const [errorKey, setErrorKey] = useState<ErrorKey | null>(null);

	useEffect(() => {
		const fetchTodayHolidays = async () => {
			try {
				const now = new Date();
				const month = now.getMonth() + 1;
				const day = now.getDate();

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

		fetchTodayHolidays();
	}, [lang]);

	function renderDateBadge() {
		if (errorKey) {
			return null;
		}

		return (
			<div className='mb-4 sm:mb-6 text-center px-4'>
				<span className='inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-800 dark:text-amber-300 rounded-full text-xs sm:text-sm font-semibold'>
					{currentDate}
				</span>
			</div>
		);
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

	return (
		<main className='mb-16 sm:mb-20 md:mb-24'>
			<Header />
			{renderDateBadge()}
			{renderContent()}
		</main>
	);
}
