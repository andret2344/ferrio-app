import {useTranslation} from 'react-i18next';

export function useLang(): 'en' | 'pl' {
	const {i18n} = useTranslation();
	return i18n.language.split('-')[0] as 'en' | 'pl';
}
