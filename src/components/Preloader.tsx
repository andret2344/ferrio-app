import * as React from 'react';

export function Preloader(): React.ReactElement {
	return (
		<div className='flex justify-center items-center py-12'>
			<div className='relative w-16 h-16'>
				<div className='absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full'></div>
				<div className='absolute inset-0 border-4 border-transparent border-t-amber-600 border-r-orange-600 rounded-full animate-spin'></div>
			</div>
		</div>
	);
}
