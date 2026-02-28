// Feb 29 and Feb 30 are "virtual" dates — they don't exist in JS Date for non-leap years,
// but the Ferrio API serves holidays for them year-round.

export interface DateEntry {
	readonly month: number;
	readonly day: number;
}

export interface RelativeDateEntry extends DateEntry {
	readonly month: number;
	readonly day: number;
	readonly daysFromToday: number;
}

// Virtual-aware next day: Feb 28→29→30→Mar 1
export function nextDay(month: number, day: number): DateEntry {
	if (month === 2 && day === 28) {
		return {month: 2, day: 29};
	}
	if (month === 2 && day === 29) {
		return {month: 2, day: 30};
	}
	if (month === 2 && day === 30) {
		return {month: 3, day: 1};
	}
	const d = new Date(new Date().getFullYear(), month - 1, day + 1);
	return {month: d.getMonth() + 1, day: d.getDate()};
}

// Real calendar next day: Feb 28/29/30 → Mar 1 (skips virtual days, used for loop advancement)
export function nextRealDay(month: number, day: number): DateEntry {
	if (month === 2 && day >= 28) {
		return {month: 3, day: 1};
	}
	const d = new Date(new Date().getFullYear(), month - 1, day + 1);
	return {month: d.getMonth() + 1, day: d.getDate()};
}

// Map virtual Feb 29/30 to their real calendar positions for date arithmetic.
// Feb 29 (virtual day 1 after Feb 28) → Mar 1; Feb 30 (virtual day 2) → Mar 2.
export function toRealCalendar(month: number, day: number): DateEntry {
	if (month === 2 && day === 29) {
		return {month: 3, day: 1};
	}
	if (month === 2 && day === 30) {
		return {month: 3, day: 2};
	}
	return {month, day};
}

// Returns true for all real calendar days and the two virtual Feb dates (29, 30).
export function isValidDay(month: number, day: number): boolean {
	if (month === 2 && day >= 29 && day <= 30) {
		return true;
	}
	const maxDay: number = new Date(new Date().getFullYear(), month, 0).getDate();
	return day >= 1 && day <= maxDay;
}

// Navigate one step forward or backward, wrapping at year boundaries and including virtual Feb dates.
export function getAdjacentDay(month: number, day: number, direction: 1 | -1): DateEntry {
	if (direction === 1) {
		return nextDay(month, day);
	}

	const year: number = new Date().getFullYear();
	if (month === 2 && day === 30) {
		return {month: 2, day: 29};
	}
	if (month === 2 && day === 29) {
		return {month: 2, day: 28};
	}
	if (month === 3 && day === 1) {
		return {month: 2, day: 30};
	}
	if (day > 1) {
		return {month, day: day - 1};
	}
	if (month === 1) {
		return {month: 12, day: 31};
	}
	const lastDayOfPrevMonth: number = new Date(year, month - 1, 0).getDate();
	return {month: month - 1, day: lastDayOfPrevMonth};
}

// Days between today and the given month/day. Virtual Feb 29/30 are calculated relative to Feb 28.
export function calcDaysFromToday(month: number, day: number, today: Date): number {
	if (month === 2 && day > 28) {
		const feb28 = new Date(today.getFullYear(), 1, 28);
		const base: number = Math.ceil((feb28.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
		return base + (day - 28);
	}
	const d: Date = new Date(today.getFullYear(), month - 1, day);
	return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

// Generate `count` display entries starting from the given date.
// Feb 28 injects virtual Feb 29 and Feb 30 as extra entries (window may exceed count by 2).
// Feb 29 as start (today was Feb 28) injects Feb 30 as an extra entry.
export function generateDateEntries(startMonth: number, startDay: number, minCount: number): RelativeDateEntry[] {
	const today: Date = new Date();
	today.setHours(0, 0, 0, 0);

	const entries: RelativeDateEntry[] = [];
	let month: number = startMonth;
	let day: number = startDay;

	while (entries.length < minCount) {
		const diff: number = calcDaysFromToday(month, day, today);
		entries.push({month, day, daysFromToday: diff});

		if (month === 2 && day === 28) {
			entries.push({month: 2, day: 29, daysFromToday: diff + 1});
			entries.push({month: 2, day: 30, daysFromToday: diff + 2});
		} else if (month === 2 && day === 29) {
			entries.push({month: 2, day: 30, daysFromToday: diff + 1});
		}

		const next: DateEntry = nextRealDay(month, day);
		month = next.month;
		day = next.day;
	}

	return entries;
}

// Advance forward by exactly `count` display entries from a start date, returning the next start.
// Feb 28 counts as 3 entries (itself + Feb 29 + Feb 30), Feb 29 counts as 2 (itself + Feb 30).
export function advanceEntries(startMonth: number, startDay: number, count: number): DateEntry {
	let month: number = startMonth;
	let day: number = startDay;
	let advanced: number = 0;

	while (advanced < count) {
		let contribution: number = 1;
		if (month === 2 && day === 28) {
			contribution = 3;
		} else if (month === 2 && day === 29) {
			contribution = 2;
		}
		advanced += contribution;
		const next: DateEntry = nextRealDay(month, day);
		month = next.month;
		day = next.day;
	}

	return {month, day};
}
