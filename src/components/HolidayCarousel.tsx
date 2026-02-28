import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import type {FerrioHoliday} from '../types/api';
import {CarouselControls} from './CarouselControls';
import {HolidayCard} from './HolidayCard';

interface HolidayCarouselProps {
	readonly holidays: readonly FerrioHoliday[];
	readonly initialIndex?: number;
	readonly onIndexChange?: (index: number) => void;
}

export function HolidayCarousel(props: HolidayCarouselProps): React.ReactElement {
	const {t} = useTranslation();

	function clampIndex(index: number): number {
		return props.holidays.length === 0 ? 0 : Math.min(Math.max(index, 0), props.holidays.length - 1);
	}

	const [currentIndex, setCurrentIndex] = useState(clampIndex(props.initialIndex ?? 0));
	const isFirstRender = useRef(true);

	useEffect(() => {
		setCurrentIndex(clampIndex(props.initialIndex ?? 0));
	}, [props.holidays, props.initialIndex]);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		props.onIndexChange?.(currentIndex);
	}, [currentIndex]);

	useEffect(() => {
		if (props.holidays.length <= 1) {
			return;
		}

		function handleKeyDown(e: KeyboardEvent): void {
			if (e.key === 'ArrowLeft') {
				setCurrentIndex((prev) => (prev === 0 ? props.holidays.length - 1 : prev - 1));
			} else if (e.key === 'ArrowRight') {
				setCurrentIndex((prev) => (prev === props.holidays.length - 1 ? 0 : prev + 1));
			}
		}

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [props.holidays.length]);

	function goToPrevious(): void {
		setCurrentIndex((prev) => (prev === 0 ? props.holidays.length - 1 : prev - 1));
	}

	function goToNext(): void {
		setCurrentIndex((prev) => (prev === props.holidays.length - 1 ? 0 : prev + 1));
	}

	if (props.holidays.length === 0) {
		return <div className='text-center py-12 text-gray-600 dark:text-gray-400'>{t('holiday.noHolidaysFound')}</div>;
	}

	return (
		<div className='relative px-2 sm:px-4 md:px-0'>
			<HolidayCard holiday={props.holidays[currentIndex]} />
			<CarouselControls
				onPrev={goToPrevious}
				onNext={goToNext}
				onDotClick={setCurrentIndex}
				holidays={props.holidays}
				currentIndex={currentIndex}
			/>
		</div>
	);
}
