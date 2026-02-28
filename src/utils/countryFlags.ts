export function getCountryFlag(countryCode: string): string {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char): number => 127397 + char.charCodeAt(0));
	return String.fromCodePoint(...codePoints);
}

export function getCountryName(countryCode: string): string {
	const countryNames: Record<string, string> = {
		AE: 'United Arab Emirates',
		AR: 'Argentina',
		AT: 'Austria',
		AU: 'Australia',
		BE: 'Belgium',
		BR: 'Brazil',
		CA: 'Canada',
		CH: 'Switzerland',
		CL: 'Chile',
		CN: 'China',
		CO: 'Colombia',
		CZ: 'Czech Republic',
		DE: 'Germany',
		DK: 'Denmark',
		DO: 'Dominican Republic',
		EG: 'Egypt',
		ES: 'Spain',
		FI: 'Finland',
		FR: 'France',
		GB: 'United Kingdom',
		GR: 'Greece',
		HU: 'Hungary',
		ID: 'Indonesia',
		IE: 'Ireland',
		IL: 'Israel',
		IN: 'India',
		IT: 'Italy',
		JP: 'Japan',
		KE: 'Kenya',
		KR: 'South Korea',
		MX: 'Mexico',
		MY: 'Malaysia',
		NG: 'Nigeria',
		NL: 'Netherlands',
		NO: 'Norway',
		NZ: 'New Zealand',
		PE: 'Peru',
		PH: 'Philippines',
		PL: 'Poland',
		PT: 'Portugal',
		RO: 'Romania',
		RU: 'Russia',
		SA: 'Saudi Arabia',
		SE: 'Sweden',
		SG: 'Singapore',
		TH: 'Thailand',
		TR: 'Turkey',
		UA: 'Ukraine',
		US: 'United States',
		VE: 'Venezuela',
		VN: 'Vietnam',
		ZA: 'South Africa'
	};

	return countryNames[countryCode.toUpperCase()] || countryCode.toUpperCase();
}
