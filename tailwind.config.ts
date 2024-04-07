import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'
import type { Config } from 'tailwindcss'

const themeOverrides = {
	'--rounded-box': 'var(--radius)',
	'--rounded-btn': 'var(--radius)',
	'--tab-radius': 'var(--radius)',
	'--rounded-badge': 'calc(var(--radius) * 2)',
}

const config: Config = {
	content: ['./src/**/*.{html,svelte,ts}'],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		fontFamily: {
			sans: ['var(--font-sans)'],
			head: ['var(--font-head)'],
		},
		container: {
			center: true,
			padding: 'var(--padding-inline)',
		},
		extend: {
			boxShadow: {
				sm: 'var(--shadow-1)',
				DEFAULT: 'var(--shadow-2)',
				md: 'var(--shadow-3)',
				lg: 'var(--shadow-4)',
				xl: 'var(--shadow-5)',
				'2xl': 'var(--shadow-6)',
			},
			padding: {
				inline: 'var(--padding-inline)',
			},
		},
	},
	daisyui: {
		logs: false,
		themes: [
			{ light: { ...themes.emerald, ...themeOverrides } },
			{ dark: { ...themes.dim, ...themeOverrides } },
		],
	},
	plugins: [daisyui],
}

export default config
