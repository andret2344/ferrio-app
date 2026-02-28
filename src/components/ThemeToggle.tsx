import * as React from 'react';
import {Moon, Sun} from 'lucide-react';

interface ThemeToggleProps {
	readonly isDark: boolean;
	readonly onToggle: () => void;
}

export function ThemeToggle(props: ThemeToggleProps): React.ReactElement {
	function getThemeIcon(): React.ReactElement {
		if (props.isDark) {
			return <Sun className='w-5 h-5 text-amber-500' />;
		}
		return <Moon className='w-5 h-5 text-gray-700' />;
	}

	return (
		<button
			onClick={props.onToggle}
			className='p-2 sm:p-2.5 md:p-3 rounded-full bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer'
			aria-label='Toggle theme'
		>
			{getThemeIcon()}
		</button>
	);
}
