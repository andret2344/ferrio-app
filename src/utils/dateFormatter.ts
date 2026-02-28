export type Language = 'en' | 'pl';

function getDaySuffix(day: number): string {
	if (day > 3 && day < 21) {
		return 'th';
	}

	const lastDigit: number = day % 10;

	if (lastDigit === 1) {
		return 'st';
	}

	if (lastDigit === 2) {
		return 'nd';
	}

	if (lastDigit === 3) {
		return 'rd';
	}

	return 'th';
}

function formatEnglishDate(date: Date): string {
	const day: number = date.getDate();
	const months: string[] = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const suffix: string = getDaySuffix(day);

	return `${day}${suffix} of ${months[date.getMonth()]}`;
}

function formatPolishDate(date: Date): string {
	const day: number = date.getDate();
	const months: string[] = [
		'stycznia',
		'lutego',
		'marca',
		'kwietnia',
		'maja',
		'czerwca',
		'lipca',
		'sierpnia',
		'września',
		'października',
		'listopada',
		'grudnia'
	];

	return `${day} ${months[date.getMonth()]}`;
}

export function formatDate(date: Date, language: Language): string {
	if (language === 'pl') {
		return formatPolishDate(date);
	}

	return formatEnglishDate(date);
}

export function formatMonthDay(day: number, month: number, language: Language): string {
	if (month === 2 && day > 28) {
		if (language === 'pl') {
			return `${day} lutego`;
		}
		return `${day}${getDaySuffix(day)} of February`;
	}
	return formatDate(new Date(new Date().getFullYear(), month - 1, day), language);
}
