import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './ButtonCva';

export default {
	title: 'Components/ButtonCva',
	component: Button,
	argTypes: {
		variant: {
			control: {
				type: 'radio', // use radio buttons to select variant
				options: ['primary', 'secondary']
			}
		},
		fullWidth: {
			control: {
				type: 'boolean' // use checkbox to select fullWidth
			}
		},
		onClick: { action: 'clicked' },
		children: {
			defaultValue: 'Default'
		}
	}
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
	variant: 'primary',
	children: 'Primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
	variant: 'secondary',
	children: 'Secondary'
};
