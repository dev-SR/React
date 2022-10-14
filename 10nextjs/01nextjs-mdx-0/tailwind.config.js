/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			code: ['Fira Code', 'monospace']
		},
		extend: {
			// fontFamily: {
			// 	sans: ['Inter', 'ui-sans-serif', 'system-ui']
			// }
		}
	},
	plugins: []
};
