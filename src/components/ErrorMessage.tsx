import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {AlertCircle} from 'lucide-react';

interface ErrorMessageProps {
	readonly message?: string;
}

export function ErrorMessage(props: ErrorMessageProps): React.ReactElement {
	const {t} = useTranslation();

	function getDisplayMessage(): string {
		if (props.message) {
			return props.message;
		}
		return t('error.fetchFailed', 'Failed to load holidays. Please try again later.');
	}

	return (
		<div className='flex items-center justify-center px-4 py-6'>
			<div className='bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6 sm:p-8 max-w-md w-full'>
				<div className='flex items-center gap-4 mb-4'>
					<div className='shrink-0 p-3 bg-red-100 dark:bg-red-900/40 rounded-full'>
						<AlertCircle className='w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400' />
					</div>
					<h3 className='text-lg sm:text-xl font-bold text-red-900 dark:text-red-200'>
						{t('error.title', 'Oops!')}
					</h3>
				</div>
				<p className='text-sm sm:text-base text-red-800 dark:text-red-300 leading-relaxed'>
					{getDisplayMessage()}
				</p>
			</div>
		</div>
	);
}
