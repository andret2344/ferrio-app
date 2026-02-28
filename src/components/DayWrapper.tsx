import * as React from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {Day} from '../pages/Day';
import {parseIntParam} from '../utils/parseParam';
import {todayPath} from '../utils/todayPath';
import {isValidDay} from '../utils/virtualDate';

export function DayWrapper(): React.ReactElement {
	const {month, day} = useParams<{month: string; day: string}>();

	const monthNum = parseIntParam(month, 0);
	const dayNum = parseIntParam(day, 0);

	const isValidMonth = monthNum >= 1 && monthNum <= 12;

	if (!isValidMonth || !isValidDay(monthNum, dayNum)) {
		return (
			<Navigate
				to={todayPath()}
				replace
			/>
		);
	}

	return <Day key={`${monthNum}-${dayNum}`} />;
}
