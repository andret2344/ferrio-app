import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {AlertCircle, Home} from 'lucide-react';

export function NotFound(): React.ReactElement {
	const {t} = useTranslation();

	return (
		<main className='flex items-center justify-center px-4 py-16'>
			<div className='text-center max-w-md'>
				<div className='mb-8 flex justify-center'>
					<div className='p-6 bg-amber-100 dark:bg-amber-900/30 rounded-full'>
						<AlertCircle className='w-16 h-16 text-amber-600 dark:text-amber-400' />
					</div>
				</div>

				<h1 className='text-6xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-4'>404</h1>

				<h2 className='text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4'>
					{t('notFound.title', 'Page Not Found')}
				</h2>

				<p className='text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed'>
					{t(
						'notFound.message',
						'The page you are looking for does not exist or has been moved. Please check the URL or return to the home page.'
					)}
				</p>

				<Link
					to='/'
					className='inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 dark:from-amber-500 dark:to-orange-500 dark:hover:from-amber-600 dark:hover:to-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105'
				>
					<Home className='w-5 h-5' />
					<span>{t('notFound.goHome', 'Go to Home Page')}</span>
				</Link>
			</div>
		</main>
	);
}
