import * as React from 'react';
import {useTranslation} from 'react-i18next';

interface LearnMoreProps {
	readonly url: string | null;
}

export function LearnMore(props: LearnMoreProps): React.ReactElement {
	const {t} = useTranslation();
	if (!props.url) {
		return <></>;
	}
	return (
		<a
			href={props.url}
			target='_blank'
			rel='noopener noreferrer'
			className='inline-block mt-4 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline underline-offset-2'
		>
			{t('holiday.learnMore')} →
		</a>
	);
}
