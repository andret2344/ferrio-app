import * as React from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import type {FerrioHoliday} from '../types/api';
import {CarouselDot} from './CarouselDot';

interface CarouselControlsProps {
	readonly onPrev: () => void;
	readonly onNext: () => void;
	readonly onDotClick: (index: number) => void;
	readonly holidays: readonly FerrioHoliday[];
	readonly currentIndex: number;
}

export function CarouselControls(props: CarouselControlsProps): React.ReactElement {
	if (props.holidays.length <= 1) {
		return <></>;
	}
	return (
		<>
			<button
				onClick={props.onPrev}
				className='absolute left-0 sm:left-2 md:left-0 top-8 sm:top-10 md:top-12 -translate-x-2 sm:-translate-x-3 md:-translate-x-4 lg:-translate-x-6 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 cursor-pointer'
				aria-label='Previous holiday'
			>
				<ChevronLeft className='w-5 h-5 sm:w-6 sm:h-6' />
			</button>

			<button
				onClick={props.onNext}
				className='absolute right-0 sm:right-2 md:right-0 top-8 sm:top-10 md:top-12 translate-x-2 sm:translate-x-3 md:translate-x-4 lg:translate-x-6 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 cursor-pointer'
				aria-label='Next holiday'
			>
				<ChevronRight className='w-5 h-5 sm:w-6 sm:h-6' />
			</button>

			<div className='flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6'>
				{props.holidays.map((_, i) => (
					<CarouselDot
						key={i}
						index={i}
						currentIndex={props.currentIndex}
						onClick={() => props.onDotClick(i)}
					/>
				))}
			</div>
		</>
	);
}
