import {useTranslation} from 'react-i18next';
import {Link, useLocation} from 'react-router-dom';
import {Menu, X} from 'lucide-react';
import {LanguagePicker} from './LanguagePicker';
import {ThemeToggle} from './ThemeToggle';
import * as React from 'react';

interface NavbarProps {
	readonly isDark: boolean;
	readonly onToggleTheme: () => void;
}

function getDesktopNavLinkClasses(isActive: boolean): string {
	const baseClasses = 'relative pb-1 font-medium transition-all duration-200 text-gray-700 dark:text-gray-300 group';
	const afterBaseClasses =
		"after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-gradient-to-r after:from-amber-600 after:via-orange-600 after:to-rose-600 after:transition-all after:duration-300";

	if (isActive) {
		return `${baseClasses} after:w-full ${afterBaseClasses}`;
	}

	return `${baseClasses} after:w-0 hover:after:w-full ${afterBaseClasses}`;
}

function getMobileNavLinkClasses(isActive: boolean): string {
	const baseClasses = 'py-3 px-4 rounded-lg font-medium transition-colors block';

	if (isActive) {
		return `${baseClasses} text-orange-600 dark:text-orange-400`;
	}

	return `${baseClasses} text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800`;
}

export function Navbar(props: NavbarProps): React.ReactElement {
	const location = useLocation();
	const {t} = useTranslation();

	function isActive(path: string): boolean {
		return location.pathname === path;
	}

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700'>
			<div className='container mx-auto px-4 py-3 max-w-6xl'>
				<div className='flex items-center justify-between'>
					<Link
						to='/'
						className='text-2xl font-bold bg-linear-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity'
					>
						Ferrio
					</Link>

					<div className='flex items-center gap-3'>
						<div className='hidden md:flex items-center gap-6 mr-3'>
							<Link
								to='/random'
								className={getDesktopNavLinkClasses(isActive('/random'))}
							>
								{t('nav.random')}
							</Link>
							<Link
								to='/upcoming'
								className={getDesktopNavLinkClasses(isActive('/upcoming'))}
							>
								{t('nav.upcoming')}
							</Link>
						</div>
						<LanguagePicker />
						<ThemeToggle
							isDark={props.isDark}
							onToggle={props.onToggleTheme}
						/>
						<div className='md:hidden'>
							<input
								id='mobile-menu'
								type='checkbox'
								className='peer hidden'
							/>
							<label
								htmlFor='mobile-menu'
								className='cursor-pointer p-2 inline-block'
							>
								<Menu className='w-6 h-6 text-gray-700 dark:text-gray-300 peer-checked:hidden' />
								<X className='w-6 h-6 text-gray-700 dark:text-gray-300 hidden peer-checked:block' />
							</label>
							<label
								htmlFor='mobile-menu'
								className='hidden peer-checked:block fixed inset-0 bg-black/20 z-40 cursor-default'
							></label>
							<div className='hidden peer-checked:block fixed top-14.25 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg z-50'>
								<div className='container mx-auto px-4 py-4 flex flex-col gap-4'>
									<label htmlFor='mobile-menu'>
										<Link
											to='/random'
											className={getMobileNavLinkClasses(isActive('/random'))}
										>
											{t('nav.random')}
										</Link>
									</label>
									<label htmlFor='mobile-menu'>
										<Link
											to='/upcoming'
											className={getMobileNavLinkClasses(isActive('/upcoming'))}
										>
											{t('nav.upcoming')}
										</Link>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
