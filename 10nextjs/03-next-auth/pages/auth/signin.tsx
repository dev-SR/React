import { Button, Center, Group, Stack, Title, Text } from '@mantine/core';
import { signIn } from 'next-auth/react';

import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const Signin = () => {
	return (
		<div>
			<Center
				sx={{
					width: '100%',
					height: '100vh'
				}}>
				<Stack spacing='xl'>
					<Title align='center'>Sign in</Title>
					<Button onClick={() => signIn('google')} size='lg' sx={{ alignSelf: 'center' }}>
						<Group>
							<Text size='md'>Sign in with Google</Text>
							<FaGoogle />
						</Group>
					</Button>
				</Stack>
			</Center>
		</div>
	);
};

export default Signin;
