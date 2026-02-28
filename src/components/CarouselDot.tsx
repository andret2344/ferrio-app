import * as React from 'react';

interface CarouselDotProps {
	readonly index: number;
	readonly currentIndex: number;
	readonly onClick: () => void;
}

export function CarouselDot(props: CarouselDotProps): React.ReactElement {
	const isActive: boolean = props.index === props.currentIndex;
	const className: string = isActive
		? 'bg-gradient-to-r from-amber-600 to-orange-600 w-6 sm:w-8'
		: 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500';
	return (
		<button
			onClick={props.onClick}
			className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${className}`}
			aria-label={`Go to holiday ${props.index + 1}`}
		/>
	);
}
