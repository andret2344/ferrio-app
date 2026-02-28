import * as React from 'react';
import {ChevronLeft, ChevronRight, Shuffle} from 'lucide-react';

interface DateNavProps {
	readonly formattedDate: string;
	readonly onPrev: () => void;
	readonly onNext: () => void;
	readonly onRandom: () => void;
}

export function DateNav(props: DateNavProps): React.ReactElement {
	return (
		<div className='mb-4 sm:mb-6 flex flex-col items-center gap-1.5'>
			<div className='flex items-center w-64'>
				<button
					onClick={props.onPrev}
					className='shrink-0 p-1 rounded-full text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors cursor-pointer'
					aria-label='Previous day'
				>
					<ChevronLeft className='w-4 h-4' />
				</button>

				<div className='flex-1 flex justify-center'>
					<span className='px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-800 dark:text-amber-300 rounded-full text-xs sm:text-sm font-semibold'>
						{props.formattedDate}
					</span>
				</div>

				<button
					onClick={props.onNext}
					className='shrink-0 p-1 rounded-full text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors cursor-pointer'
					aria-label='Next day'
				>
					<ChevronRight className='w-4 h-4' />
				</button>
			</div>

			<button
				onClick={props.onRandom}
				className='p-1 rounded-full text-gray-400 dark:text-gray-500 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors cursor-pointer'
				aria-label='Random day'
			>
				<Shuffle className='w-3.5 h-3.5' />
			</button>
		</div>
	);
}
