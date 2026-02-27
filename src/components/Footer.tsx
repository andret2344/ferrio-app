import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import * as React from 'react';

export function Footer(): React.ReactElement {
	const {t} = useTranslation();
	const currentYear: number = new Date().getFullYear();

	return (
		<footer className='fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 py-3 sm:py-4 md:py-6'>
			<div className='container mx-auto px-4 max-w-4xl'>
				<div className='flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
					<p className='text-center sm:text-left'>
						&copy; {currentYear} Ferrio. {t('footer.copyright')}
					</p>
					<Link
						to='/privacy'
						className='hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 font-medium'
					>
						{t('footer.privacyPolicy')}
					</Link>
				</div>
			</div>
		</footer>
	);
}
