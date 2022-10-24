import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
	ChakraProvider,
	ComponentMultiStyleConfig,
	withDefaultVariant,
	extendTheme,
	ThemeOverride,
	theme as baseTheme,
	withDefaultColorScheme
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { defineStyleConfig } from '@chakra-ui/react';

// https://chakra-ui.com/docs/styled-system/customize-theme
// https://chakra-ui.com/docs/styled-system/component-style
// https://github.com/chakra-ui/chakra-ui/tree/main/packages/components/theme/src/components
const inputSelectStyles: ComponentMultiStyleConfig = {
	variants: {
		filled: (props) => ({
			field: {
				borderRadius: 'md',
				borderColor: 'blue.600',
				boxShadow: 'none',
				_focus: {
					borderColor: 'blue.400',
					boxShadow: 'none'
				},
				_placeholder: mode('gray.400', 'whiteAlpha.400')(props)
			}
		})
	},
	defaultProps: {
		size: 'sm',
		variant: 'outline'
	},
	parts: []
};

const theme: ThemeOverride = extendTheme(
	{
		fonts: {
			body: `'Inter', ${baseTheme.fonts.heading}`
		},
		colors: {
			// must be from 50 to 90 to work properly
			primary: {
				50: '#FAF5FF',
				100: '#E9D8FD',
				200: '#D6BCFA',
				300: '#D6BCFA',
				400: '#9F7AEA',
				500: '#9F7AEA',
				600: '#9F7AEA',
				700: '#553C9A',
				800: '#44337A',
				900: '#322659'
			},
			secondary: {
				50: '#FFF5F7',
				100: '#FED7E2',
				200: '#FBB6CE',
				300: '#F687B3',
				400: '#ED64A6',
				500: '#D53F8C',
				600: '#B83280',
				700: '#97266D',
				800: '#702459',
				900: '#521B41'
			}
		},
		components: {
			Input: { ...inputSelectStyles },
			Button: {
				baseStyle: {
					fontWeight: 'light'
				},
				defaultProps: {
					size: 'sm'
				}
			}
		}
	},
	// extend `primary` colorScheme for checkbox
	withDefaultColorScheme({
		colorScheme: 'primary',
		components: ['Checkbox']
	}),
	// Input and Select should be of filled variant by default
	withDefaultVariant({
		variant: 'filled',
		components: ['Input', 'Select']
	})
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
