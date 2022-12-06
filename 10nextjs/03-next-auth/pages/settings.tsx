import PageLayout from '@ui/layout/PageLayout';
import React from 'react';
import { CustomNextPage } from 'types/CustomNextType';

const Settings: CustomNextPage = () => {
	return <PageLayout>Settings</PageLayout>;
};
Settings.auth = true;
export default Settings;
