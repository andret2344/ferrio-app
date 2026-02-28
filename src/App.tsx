import * as React from 'react';
import {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {DayWrapper} from './components/DayWrapper';
import {Footer} from './components/Footer';
import {Navbar} from './components/Navbar';
import {ScrollToTop} from './components/ScrollToTop';
import {NotFound} from './pages/NotFound';
import {PrivacyPolicy} from './pages/PrivacyPolicy';
import {Upcoming} from './pages/Upcoming';
import {todayPath} from './utils/todayPath';

function getSavedTheme(): boolean {
	const savedTheme = localStorage.getItem('theme');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return savedTheme === 'dark' || (!savedTheme && prefersDark);
}

function applyTheme(isDark: boolean): void {
	if (isDark) {
		document.documentElement.classList.add('dark');
		localStorage.setItem('theme', 'dark');
	} else {
		document.documentElement.classList.remove('dark');
		localStorage.setItem('theme', 'light');
	}
}

function App(): React.ReactElement {
	const [isDark, setIsDark] = useState<boolean>(getSavedTheme);

	useEffect(() => {
		applyTheme(isDark);
	}, [isDark]);

	function toggleTheme(): void {
		setIsDark(!isDark);
	}

	return (
		<BrowserRouter>
			<div className='min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300'>
				<ScrollToTop />
				<Navbar
					isDark={isDark}
					onToggleTheme={toggleTheme}
				/>

				<div className='container mx-auto px-4 py-6 sm:py-8 max-w-4xl pt-20 sm:pt-24'>
					<Routes>
						<Route
							path='/'
							element={
								<Navigate
									to={todayPath()}
									replace
								/>
							}
						/>
						<Route
							path='/day/:month/:day'
							element={<DayWrapper />}
						/>
						<Route
							path='/upcoming'
							element={
								<Navigate
									to='/upcoming/0'
									replace
								/>
							}
						/>
						<Route
							path='/upcoming/:week'
							element={<Upcoming />}
						/>
						<Route
							path='/privacy'
							element={<PrivacyPolicy />}
						/>
						<Route
							path='*'
							element={<NotFound />}
						/>
					</Routes>

					<Footer />
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
