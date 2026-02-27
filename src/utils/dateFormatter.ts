type Language = 'en' | 'pl';

function getDaySuffix(day: number): string {
	if (day > 3 && day < 21) {
		return 'th';
	}

	const lastDigit = day % 10;

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
	const day = date.getDate();
	const months = [
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
	const suffix = getDaySuffix(day);

	return `${day}${suffix} of ${months[date.getMonth()]}`;
}

function formatPolishDate(date: Date): string {
	const day = date.getDate();
	const months = [
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

export function getCurrentDate(language: Language): string {
	return formatDate(new Date(), language);
}
