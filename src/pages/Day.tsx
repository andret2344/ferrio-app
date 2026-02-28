import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {DateNav} from '../components/DateNav';
import {DayContent} from '../components/DayContent';
import {Header} from '../components/Header';
import {useLang} from '../hooks/useLang';
import type {FerrioHoliday} from '../types/api';
import {formatMonthDay} from '../utils/dateFormatter';
import {fetchHolidaysByDate} from '../utils/ferrioApi';
import {parseIntParam} from '../utils/parseParam';
import {getRandomDate} from '../utils/randomDate';
import {getAdjacentDay} from '../utils/virtualDate';

export function Day(): React.ReactElement {
	const {month, day} = useParams<{month: string; day: string}>();
	const location = useLocation();
	const navigate = useNavigate();
	const lang = useLang();

	const monthNum = parseIntParam(month, 1);
	const dayNum = parseIntParam(day, 1);

	const isRandomCarousel = (location.state as {randomCarousel?: boolean} | null)?.randomCarousel === true;

	const [initialIndex, setInitialIndex] = useState<number>(parseIntParam(location.hash.slice(1), 0));

	// Track whether a hash change was triggered internally (by onIndexChange) to avoid circular updates
	const internalHashChange = useRef(false);

	useEffect(() => {
		if (internalHashChange.current) {
			internalHashChange.current = false;
			return;
		}
		setInitialIndex(parseIntParam(location.hash.slice(1), 0));
	}, [location.hash]);

	const [holidays, setHolidays] = useState<FerrioHoliday[]>([]);
	const [loading, setLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const formattedDate = formatMonthDay(dayNum, monthNum, lang);

	useEffect(() => {
		const controller = new AbortController();

		const load = async (): Promise<void> => {
			setLoading(true);

			try {
				const result = await fetchHolidaysByDate(dayNum, monthNum, lang, controller.signal);
				if (controller.signal.aborted) {
					return;
				}
				setHolidays(result);
				setHasError(false);
				if (isRandomCarousel && result.length > 1) {
					setInitialIndex(Math.floor(Math.random() * result.length));
				}
			} catch {
				if (controller.signal.aborted) {
					return;
				}
				setHasError(true);
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		};

		load();
		return () => controller.abort();
	}, [dayNum, monthNum, lang]);

	function handleIndexChange(index: number): void {
		internalHashChange.current = true;
		navigate(location.pathname + '#' + index, {replace: true});
	}

	function navigateDay(direction: 1 | -1): void {
		const adjacent = getAdjacentDay(monthNum, dayNum, direction);
		navigate(`/day/${adjacent.month}/${adjacent.day}`);
	}

	function navigateRandom(): void {
		const date = getRandomDate();
		navigate(`/day/${date.month}/${date.day}`, {state: {randomCarousel: true}});
	}

	let dateNav: React.ReactElement = <></>;
	if (!hasError) {
		dateNav = (
			<DateNav
				formattedDate={formattedDate}
				onPrev={() => navigateDay(-1)}
				onNext={() => navigateDay(1)}
				onRandom={navigateRandom}
			/>
		);
	}

	return (
		<main className='mb-16 sm:mb-20 md:mb-24'>
			<Header />
			{dateNav}
			<DayContent
				loading={loading}
				hasError={hasError}
				holidays={holidays}
				initialIndex={initialIndex}
				onIndexChange={handleIndexChange}
			/>
		</main>
	);
}
