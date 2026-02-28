// Feb has 30 entries: 28 real days + virtual 29th and 30th
const MONTH_DAYS = [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const TOTAL_DAYS = MONTH_DAYS.reduce((sum, d) => sum + d, 0);

export function getRandomDate(): {month: number; day: number} {
	let n = Math.floor(Math.random() * TOTAL_DAYS);
	for (let m = 0; m < 12; m++) {
		if (n < MONTH_DAYS[m]) {
			return {month: m + 1, day: n + 1};
		}
		n -= MONTH_DAYS[m];
	}
	return {month: 12, day: 31};
}
