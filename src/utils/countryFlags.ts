export function getCountryFlag(countryCode: string): string {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt(0));
	return String.fromCodePoint(...codePoints);
}

export function getCountryName(countryCode: string): string {
	const countryNames: Record<string, string> = {
		US: 'United States',
		GB: 'United Kingdom',
		PL: 'Poland',
		DE: 'Germany',
		FR: 'France',
		ES: 'Spain',
		IT: 'Italy',
		CA: 'Canada',
		AU: 'Australia',
		JP: 'Japan',
		CN: 'China',
		IN: 'India',
		BR: 'Brazil',
		MX: 'Mexico',
		AR: 'Argentina',
		RU: 'Russia',
		KR: 'South Korea',
		NL: 'Netherlands',
		SE: 'Sweden',
		NO: 'Norway',
		DK: 'Denmark',
		FI: 'Finland',
		IE: 'Ireland',
		PT: 'Portugal',
		GR: 'Greece',
		TR: 'Turkey',
		SA: 'Saudi Arabia',
		AE: 'United Arab Emirates',
		IL: 'Israel',
		EG: 'Egypt',
		ZA: 'South Africa',
		NG: 'Nigeria',
		KE: 'Kenya',
		TH: 'Thailand',
		SG: 'Singapore',
		MY: 'Malaysia',
		PH: 'Philippines',
		VN: 'Vietnam',
		ID: 'Indonesia',
		NZ: 'New Zealand',
		CH: 'Switzerland',
		AT: 'Austria',
		BE: 'Belgium',
		CZ: 'Czech Republic',
		HU: 'Hungary',
		RO: 'Romania',
		UA: 'Ukraine',
		CL: 'Chile',
		CO: 'Colombia',
		PE: 'Peru',
		VE: 'Venezuela',
		DO: 'Dominican Republic'
	};

	return countryNames[countryCode.toUpperCase()] || countryCode.toUpperCase();
}
