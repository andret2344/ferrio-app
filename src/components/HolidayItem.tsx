import * as React from 'react';
import {Link} from 'react-router-dom';
import type {FerrioHoliday} from '../types/api';
import {truncateText} from '../utils/truncateText';

interface HolidayItemProps {
	readonly holiday: FerrioHoliday;
	readonly month: number;
	readonly day: number;
	readonly index: number;
}

export function HolidayItem(props: HolidayItemProps): React.ReactElement {
	const hasDescription = props.holiday.description.length > 0;
	const to = `/day/${props.month}/${props.day}#${props.index}`;

	const baseClasses =
		'block w-full text-left p-2 sm:p-3 rounded-lg transition-all duration-200 group border border-transparent';
	const hoverClasses = hasDescription
		? ' hover:bg-amber-50 dark:hover:bg-gray-700/50 hover:border-amber-200 dark:hover:border-amber-800'
		: '';
	const nameClasses =
		'font-medium text-sm sm:text-base text-gray-900 dark:text-white break-words' +
		(hasDescription ? ' group-hover:text-amber-600 dark:group-hover:text-amber-400' : '');

	let description: React.ReactElement = <></>;
	if (props.holiday.description) {
		description = (
			<p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-3.5 sm:ml-4 leading-relaxed'>
				{truncateText(props.holiday.description, 100)}
			</p>
		);
	}

	return (
		<Link
			to={to}
			className={baseClasses + hoverClasses}
		>
			<div className='mb-1'>
				<span className={nameClasses}>{props.holiday.name}</span>
			</div>
			{description}
		</Link>
	);
}
