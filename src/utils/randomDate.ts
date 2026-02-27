export function getRandomDate(): Date {
	const currentYear = new Date().getFullYear();
	const month = Math.floor(Math.random() * 12);
	const maxDay = new Date(currentYear, month + 1, 0).getDate();
	const day = Math.floor(Math.random() * maxDay) + 1;

	return new Date(currentYear, month, day);
}
