import {useTranslation} from 'react-i18next';
import {Shield} from 'lucide-react';
import * as React from 'react';

const sectionTitleClass = 'text-base font-bold text-orange-600 dark:text-orange-400 mb-3';
const paraClass = 'text-sm text-gray-700 dark:text-gray-300 leading-relaxed';
const listClass = 'mt-2 ml-1 space-y-1.5';
const listItemClass = 'flex gap-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed';
const dotClass = 'text-amber-500 mt-0.5 shrink-0 font-bold';
const dividerClass = 'border-gray-100 dark:border-gray-700';

export function PrivacyPolicy(): React.ReactElement {
	const {t} = useTranslation();

	return (
		<main className='mb-16 sm:mb-20 md:mb-24'>
			<div className='text-center mb-8'>
				<div className='inline-flex p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4'>
					<Shield className='w-8 h-8 text-amber-600 dark:text-amber-400' />
				</div>
				<h1 className='text-3xl sm:text-4xl font-bold bg-linear-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent pb-1 mb-3'>
					{t('privacy.title')}
				</h1>
				<span className='inline-block text-xs font-medium text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700'>
					{t('privacy.effectiveDate')}
				</span>
			</div>

			<div className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-amber-100/80 dark:border-gray-700 p-6 sm:p-8 space-y-6'>
				<section>
					<h2 className={sectionTitleClass}>{t('privacy.s1Title')}</h2>
					<p className={paraClass}>{t('privacy.s1p1')}</p>
					<p className={`${paraClass} mt-1`}>{t('privacy.s1p2')}</p>
				</section>

				<hr className={dividerClass} />

				<section>
					<h2 className={sectionTitleClass}>{t('privacy.s2Title')}</h2>
					<p className={paraClass}>{t('privacy.s2p1')}</p>
					<p className={`${paraClass} mt-2`}>{t('privacy.s2p2')}</p>
					<ul className={listClass}>
						<li className={listItemClass}>
							<span className={dotClass}>•</span>
							{t('privacy.s2i1')}
						</li>
						<li className={listItemClass}>
							<span className={dotClass}>•</span>
							{t('privacy.s2i2')}
						</li>
					</ul>
					<p className={`${paraClass} mt-2`}>{t('privacy.s2p3')}</p>
				</section>

				<hr className={dividerClass} />

				<section>
					<h2 className={sectionTitleClass}>{t('privacy.s3Title')}</h2>
					<p className={paraClass}>{t('privacy.s3p1')}</p>
					<p className={`${paraClass} mt-1`}>{t('privacy.s3p2')}</p>
				</section>

				<hr className={dividerClass} />

				<section>
					<h2 className={sectionTitleClass}>{t('privacy.s4Title')}</h2>
					<p className={paraClass}>{t('privacy.s4p1')}</p>
					<p className={`${paraClass} mt-1`}>{t('privacy.s4p2')}</p>
				</section>

				<hr className={dividerClass} />

				<section>
					<h2 className={sectionTitleClass}>{t('privacy.s5Title')}</h2>
					<p className={paraClass}>{t('privacy.s5p1')}</p>
					<ul className={listClass}>
						<li className={listItemClass}>
							<span className={dotClass}>•</span>
							{t('privacy.s5i1')}
						</li>
						<li className={listItemClass}>
							<span className={dotClass}>•</span>
							{t('privacy.s5i2')}
						</li>
						<li className={listItemClass}>
							<span className={dotClass}>•</span>
							{t('privacy.s5i3')}
						</li>
					</ul>
					<p className={`${paraClass} mt-2`}>{t('privacy.s5p2')}</p>
				</section>

				<hr className={dividerClass} />

				<section>
					<h2 className={sectionTitleClass}>{t('privacy.s6Title')}</h2>
					<p className={paraClass}>{t('privacy.s6p1')}</p>
				</section>

				<hr className={dividerClass} />

				<section>
					<h2 className={sectionTitleClass}>{t('privacy.s7Title')}</h2>
					<p className={paraClass}>{t('privacy.s7p1')}</p>
					<p className={`${paraClass} mt-1`}>{t('privacy.s7p2')}</p>
					<p className={`${paraClass} mt-1`}>{t('privacy.s7p3')}</p>
				</section>

				<hr className={dividerClass} />

				<section>
					<h2 className={sectionTitleClass}>{t('privacy.s8Title')}</h2>
					<p className={paraClass}>{t('privacy.s8p1')}</p>
					<ul className={listClass}>
						<li className={listItemClass}>
							<span className={dotClass}>•</span>
							{t('privacy.s8i1')}
						</li>
						<li className={listItemClass}>
							<span className={dotClass}>•</span>
							{t('privacy.s8i2')}
						</li>
						<li className={listItemClass}>
							<span className={dotClass}>•</span>
							{t('privacy.s8i3')}
						</li>
						<li className={listItemClass}>
							<span className={dotClass}>•</span>
							{t('privacy.s8i4')}
						</li>
					</ul>
				</section>

				<hr className={dividerClass} />

				<section>
					<h2 className={sectionTitleClass}>{t('privacy.s9Title')}</h2>
					<p className={paraClass}>{t('privacy.s9p1')}</p>
				</section>

				<hr className={dividerClass} />

				<section>
					<h2 className={sectionTitleClass}>{t('privacy.s10Title')}</h2>
					<p className={paraClass}>{t('privacy.s10p1')}</p>
				</section>
			</div>
		</main>
	);
}
