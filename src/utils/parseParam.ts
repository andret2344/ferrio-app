export function parseIntParam(value: string | undefined, fallback: number): number {
	const parsed: number = parseInt(value ?? '', 10);
	return isNaN(parsed) ? fallback : parsed;
}
