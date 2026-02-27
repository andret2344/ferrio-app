import {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Footer} from './components/Footer';
import {Navbar} from './components/Navbar';
import {Home} from './pages/Home';
import {NotFound} from './pages/NotFound';
import {RandomHoliday} from './pages/RandomHoliday';
import {Upcoming} from './pages/Upcoming';
import * as React from 'react';

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

function App() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const shouldBeDark = getSavedTheme();
		setIsDark(shouldBeDark);
	}, []);

	useEffect(() => {
		applyTheme(isDark);
	}, [isDark]);

	function toggleTheme(): void {
		setIsDark(!isDark);
	}

	return (
		<BrowserRouter>
			<AppContent
				isDark={isDark}
				onToggleTheme={toggleTheme}
			/>
		</BrowserRouter>
	);
}

function AppContent({isDark, onToggleTheme}: {isDark: boolean; onToggleTheme: () => void}): React.ReactElement {
	return (
		<div className='min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300'>
			<Navbar
				isDark={isDark}
				onToggleTheme={onToggleTheme}
			/>

			<div className='container mx-auto px-4 py-6 sm:py-8 max-w-4xl pt-20 sm:pt-24'>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/random'
						element={<RandomHoliday />}
					/>
					<Route
						path='/upcoming'
						element={<Upcoming />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
				</Routes>

				<Footer />
			</div>
		</div>
	);
}

export default App;
