/** @type {import('tailwindcss').Config} */
// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const defaultColors = require('tailwindcss/colors');
// https://tailwindcss.com/docs/plugins
const plugin = require('tailwindcss/plugin');

const customColors = {
	primary: {
		DEFAULT: '#5a79d7',
		light: '#7a9be0',
		medium: '#3c4db9',
		dark: '#303a78'
	},
	secondary: {
		DEFAULT: defaultColors.pink[500],
		...defaultColors.pink
	}
};
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: customColors,
			ringColor: ({ theme }) => ({
				DEFAULT: theme('colors.primary.light'),
				...theme('colors')
			})
		}
	},
	plugins: [
		plugin(function ({ addUtilities, addComponents, e, config, theme, addBase }) {
			// Add your custom styles here
			addBase({
				h1: {
					color: theme('colors.primary.DEFAULT'),
					fontSize: theme('fontSize.5xl'),
					fontWeight: theme('fontWeight.bold')
				},
				button: {
					padding: `${theme('spacing.4')} ${theme('spacing.12')}`, // 1rem 3rem
					borderRadius: theme('borderRadius.lg'),
					backgroundColor: theme('colors.primary.DEFAULT'),
					color: theme('colors.white'),
					fontSize: theme('fontSize.sm'),
					fontWeight: theme('fontWeight.medium'),
					'&:hover': {
						backgroundColor: theme('colors.primary.medium')
					}
				}
			});
		})
	]
};
