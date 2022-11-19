import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './ButtonClassName';

export default {
	title: 'Components/ButtonClassName',
	component: Button,
	argTypes: {
		variant: {
			control: {
				type: 'radio', // use radio buttons to select variant
				options: ['primary', 'secondary']
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
