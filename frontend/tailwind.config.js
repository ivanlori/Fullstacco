module.exports = {
	content: ['./src/**/*.tsx'],
	theme: {
		colors: {
			blue_light: '#6891C7',
			blue_primary: '#536CBD',
			blue_dark: '#4749A7',
			magenta_light: '#fb33d3',
			magenta_primary: '#bf03b1',
			magenta_dark: '#5d0156',
			ochre_light: '#f1d740',
			ochre_primary: '#f4883b',
			ochre_dark: '#a62a0f',
			green_light: '#00ffa8',
			green_primary: '#2ad89d',
			green_dark: '#067a55',
			white: '#ffffff',
			gray_100: '#f2f3fb',
			gray_200: '#dadeeb',
			gray_300: '#c1c8d9',
			gray_400: '#a0a6bb',
			gray_500: '#7f849c',
			gray_600: '#5d617d',
			gray_700: '#383c5b',
			gray_800: '#1e213a',
			gray_900: '#0e141e',
		},
		fontFamily: {
			sans: ['Open Sans', 'sans-serif'],
			poppins: ['Poppins', 'sans-serif'],
		},
		extend: {
			spacing: {
				'8xl': '96rem',
				'9xl': '128rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
		},
	},
}
