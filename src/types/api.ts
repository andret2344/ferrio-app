export interface FerrioHoliday {
	readonly id: string;
	readonly day: number;
	readonly month: number;
	readonly name: string;
	readonly usual: boolean;
	readonly description: string;
	readonly country: string | null;
	readonly url: string | null;
	readonly mature_content: boolean;
}
