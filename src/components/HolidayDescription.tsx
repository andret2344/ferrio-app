import * as React from 'react';

interface ParagraphProps {
	readonly text: string;
	readonly index: number;
}

function Paragraph(props: ParagraphProps): React.ReactElement {
	return (
		<p
			key={props.index}
			className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'
		>
			{props.text}
		</p>
	);
}

interface HolidayDescriptionProps {
	readonly description: string;
}

export function HolidayDescription(props: HolidayDescriptionProps): React.ReactElement {
	if (!props.description) {
		return <></>;
	}
	const paragraphs = props.description.split('\n').filter((p) => p.trim() !== '');
	return (
		<div className='flex flex-col gap-3'>
			{paragraphs.map((text, i) => (
				<Paragraph
					key={i}
					text={text}
					index={i}
				/>
			))}
		</div>
	);
}
