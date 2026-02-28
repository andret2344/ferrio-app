import type {FerrioHoliday} from '../types/api';

const API_BASE_URL: string = 'https://api.ferrio.app';
const CACHE_TTL_MS: number = 60 * 60 * 1000; // 1 hour
const CACHE_MAX_SIZE: number = 14;

interface CacheEntry {
	readonly data: FerrioHoliday[];
	readonly timestamp: number;
}

const holidayCache = new Map<string, CacheEntry>();

export async function fetchHolidaysByDate(
	day: number,
	month: number,
	lang: string = 'pl',
	signal?: AbortSignal
): Promise<FerrioHoliday[]> {
	const cacheKey: string = `${lang}-${month}-${day}`;
	const cached: CacheEntry | undefined = holidayCache.get(cacheKey);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
		return cached.data;
	}

	const response: Response = await fetch(`${API_BASE_URL}/v3/holidays?lang=${lang}&day=${day}&month=${month}`, {signal});

	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`);
	}

	const data: FerrioHoliday[] = await response.json();
	const result: FerrioHoliday[] = Array.isArray(data) ? data.filter((h: FerrioHoliday): boolean => !h.mature_content) : [];

	if (holidayCache.size >= CACHE_MAX_SIZE) {
		holidayCache.clear();
	}
	holidayCache.set(cacheKey, {data: result, timestamp: Date.now()});
	return result;
}
