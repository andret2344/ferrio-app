import type {FerrioHoliday} from '../types/api';

const API_BASE_URL = 'https://api.ferrio.app';

export async function fetchHolidaysByDate(day: number, month: number, lang: string = 'pl'): Promise<FerrioHoliday[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/v3/holidays?lang=${lang}&day=${day}&month=${month}`);

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data: FerrioHoliday[] = await response.json();
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error('Error fetching holidays from Ferrio API:', error);
		throw error;
	}
}

export async function fetchAllHolidays(lang: string = 'pl'): Promise<FerrioHoliday[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/v3/holidays?lang=${lang}`);

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data: FerrioHoliday[] = await response.json();
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error('Error fetching all holidays:', error);
		throw error;
	}
}
