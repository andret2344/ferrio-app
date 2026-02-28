import * as React from 'react';
import {useTranslation} from 'react-i18next';

export function Header(): React.ReactElement {
	const {t} = useTranslation();

	return (
		<div className='text-center pt-6 sm:pt-0 mb-8 sm:mb-12 md:mb-16'>
			<h1 className='relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight'>
				<span className='relative inline-block'>
					<span className='absolute inset-0 bg-linear-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent blur-sm opacity-50'>
						Ferrio
					</span>
					<span className='relative bg-linear-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent drop-shadow-lg'>
						Ferrio
					</span>
				</span>
			</h1>
			<p className='text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 px-4'>{t('app.title')}</p>
		</div>
	);
}
