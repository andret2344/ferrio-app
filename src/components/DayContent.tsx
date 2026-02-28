import * as React from 'react';
import {useTranslation} from 'react-i18next';
import type {FerrioHoliday} from '../types/api';
import {ErrorMessage} from './ErrorMessage';
import {HolidayCarousel} from './HolidayCarousel';
import {Preloader} from './Preloader';

interface DayContentProps {
	readonly loading: boolean;
	readonly hasError: boolean;
	readonly holidays: FerrioHoliday[];
	readonly initialIndex: number;
	readonly onIndexChange: (index: number) => void;
}

export function DayContent(props: DayContentProps): React.ReactElement {
	const {t} = useTranslation();

	if (props.loading) {
		return <Preloader />;
	}
	if (props.hasError) {
		return <ErrorMessage message={t('error.connectionError')} />;
	}
	return (
		<HolidayCarousel
			holidays={props.holidays}
			initialIndex={props.initialIndex}
			onIndexChange={props.onIndexChange}
		/>
	);
}
