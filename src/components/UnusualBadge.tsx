import * as React from 'react';
import {useTranslation} from 'react-i18next';

interface UnusualBadgeProps {
	readonly usual: boolean;
}

export function UnusualBadge(props: UnusualBadgeProps): React.ReactElement {
	const {t} = useTranslation();
	if (props.usual) {
		return (
			<span className='text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-400/40 text-gray-700 dark:text-gray-300'>
				{t('holiday.usual')}
			</span>
		);
	}
	return (
		<span className='text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'>
			{t('holiday.unusual')}
		</span>
	);
}
