import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import type {FerrioHoliday} from '../types/api';
import {fetchHolidaysByDate} from '../utils/ferrioApi';
import {advanceEntries, generateDateEntries, nextDay, toRealCalendar} from '../utils/virtualDate';
import {useLang} from './useLang';

export interface DayHolidays {
	readonly month: number;
	readonly day: number;
	readonly daysFromToday: number;
	readonly holidays: FerrioHoliday[];
}

export function useUpcomingHolidays(weekOffset: number): {
	holidays: DayHolidays[];
	loading: boolean;
	error: string | null;
} {
	const {t} = useTranslation();
	const lang = useLang();
	const [holidays, setHolidays] = useState<DayHolidays[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		function getStartDate(): {month: number; day: number} {
			const today = new Date();
			const tomorrow = nextDay(today.getMonth() + 1, today.getDate());

			if (weekOffset === 0) {
				return tomorrow;
			}

			if (weekOffset > 0) {
				return advanceEntries(tomorrow.month, tomorrow.day, weekOffset * 7);
			}

			// Negative offset: convert virtual Feb dates to real calendar positions, then subtract weeks
			const real = toRealCalendar(tomorrow.month, tomorrow.day);
			const d = new Date(new Date().getFullYear(), real.month - 1, real.day + weekOffset * 7);
			return {month: d.getMonth() + 1, day: d.getDate()};
		}

		const load = async (): Promise<void> => {
			setLoading(true);
			setError(null);

			try {
				const start = getStartDate();
				const entries = generateDateEntries(start.month, start.day, 7);

				const results = await Promise.allSettled(
					entries.map((e) => fetchHolidaysByDate(e.day, e.month, lang, controller.signal))
				);

				if (controller.signal.aborted) {
					return;
				}

				setHolidays(
					entries.map((e, i) => {
						const result = results[i];
						return {
							month: e.month,
							day: e.day,
							daysFromToday: e.daysFromToday,
							holidays: result.status === 'fulfilled' ? result.value : []
						};
					})
				);
			} catch {
				if (controller.signal.aborted) {
					return;
				}
				setError(t('error.connectionError'));
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		};

		load();
		return () => controller.abort();
	}, [weekOffset, lang, t]);

	return {holidays, loading, error};
}
