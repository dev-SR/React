// src/components/buttons/__stories__/Button.stories.tsx

import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Button from './Button';

export default {
	title: 'Components/Buttons',
	component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button>Default</Button>;

export const Default = Template.bind({});
