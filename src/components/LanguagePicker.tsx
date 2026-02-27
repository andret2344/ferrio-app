import {useTranslation} from 'react-i18next';
import * as React from 'react';

function getLanguageClasses(isActive: boolean): string {
	const baseClasses = 'font-medium transition-colors duration-200';

	if (isActive) {
		return `${baseClasses} text-orange-600 dark:text-orange-400 text-base`;
	}

	return `${baseClasses} text-gray-400 dark:text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 text-sm`;
}

export function LanguagePicker(): React.ReactElement {
	const {i18n} = useTranslation();

	function changeLanguage(language: string) {
		i18n.changeLanguage(language);
	}

	const baseLang = i18n.language.split('-')[0];
	const isPolish = baseLang === 'pl';
	const isEnglish = !isPolish;

	return (
		<div className='flex items-center gap-1.5 sm:gap-2 h-6'>
			<button
				onClick={() => changeLanguage('en')}
				className={getLanguageClasses(isEnglish)}
			>
				EN
			</button>
			<span className='text-gray-400 text-sm'>/</span>
			<button
				onClick={() => changeLanguage('pl')}
				className={getLanguageClasses(isPolish)}
			>
				PL
			</button>
		</div>
	);
}
