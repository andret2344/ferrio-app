import * as React from 'react';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link, useLocation} from 'react-router-dom';
import {Menu, X} from 'lucide-react';
import {todayPath} from '../utils/todayPath';
import {LanguagePicker} from './LanguagePicker';
import {ThemeToggle} from './ThemeToggle';

interface NavbarProps {
	readonly isDark: boolean;
	readonly onToggleTheme: () => void;
}

export function Navbar(props: NavbarProps): React.ReactElement {
	const location = useLocation();
	const {t} = useTranslation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const todayHref = todayPath();

	useEffect(() => {
		setIsMenuOpen(false);
	}, [location.pathname]);

	function getDesktopNavLinkClasses(isActive: boolean): string {
		const baseClasses =
			'relative pb-1 font-medium transition-all duration-200 text-gray-700 dark:text-gray-300 group';
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

	function renderMenuIcon(): React.ReactElement {
		if (isMenuOpen) {
			return <X className='w-6 h-6 text-gray-700 dark:text-gray-300' />;
		}
		return <Menu className='w-6 h-6 text-gray-700 dark:text-gray-300' />;
	}

	function renderMobileMenu(): React.ReactElement {
		if (!isMenuOpen) {
			return <></>;
		}
		return (
			<>
				<button
					type='button'
					aria-label='Close menu'
					className='fixed inset-0 bg-black/20 z-40 cursor-default'
					onClick={() => setIsMenuOpen(false)}
				/>
				<div className='fixed top-14.25 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg z-50'>
					<div className='container mx-auto px-4 py-4 flex flex-col gap-4'>
						<Link
							to={todayHref}
							className={getMobileNavLinkClasses(location.pathname === todayHref)}
						>
							{t('nav.today')}
						</Link>
						<Link
							to='/upcoming/0'
							className={getMobileNavLinkClasses(location.pathname.startsWith('/upcoming'))}
						>
							{t('nav.upcoming')}
						</Link>
					</div>
				</div>
			</>
		);
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
								to={todayHref}
								className={getDesktopNavLinkClasses(location.pathname === todayHref)}
							>
								{t('nav.today')}
							</Link>
							<Link
								to='/upcoming/0'
								className={getDesktopNavLinkClasses(location.pathname.startsWith('/upcoming'))}
							>
								{t('nav.upcoming')}
							</Link>
						</div>
						<LanguagePicker />
						<ThemeToggle
							isDark={props.isDark}
							onToggle={props.onToggleTheme}
						/>
						<button
							className='md:hidden p-2 cursor-pointer'
							onClick={() => setIsMenuOpen((prev) => !prev)}
							aria-label='Toggle menu'
						>
							{renderMenuIcon()}
						</button>
					</div>
				</div>
			</div>

			{renderMobileMenu()}
		</nav>
	);
}
