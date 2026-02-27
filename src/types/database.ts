export interface Holiday {
	readonly id: string;
	readonly name: string;
	readonly description: string | null;
	readonly month: number;
	readonly day: number;
	readonly is_international: boolean;
	readonly country: string | null;
	readonly created_at: string;
}
