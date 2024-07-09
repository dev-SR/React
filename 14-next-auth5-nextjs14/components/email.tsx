'use server';
import getBaseUrl from '@/lib/base-url';
import { Resend } from 'resend';

import { Html, Button, Link, Text } from '@react-email/components';
import { generateEmailVerificationToken } from '@/actions/auth/verifyEmailToken';

export const VerificationEmail = ({ link }: { link: string }) => {
	return (
		<Html lang='en' dir='ltr'>
			<Text> Please verify your email by clicking on the link below:</Text>
			<Link
				href={link}
				target='_blank'
				style={{
					paddingLeft: '1.5rem',
					paddingRight: '1.5rem',
					paddingTop: '0.5rem',
					paddingBottom: '0.5rem',
					fontWeight: '500',
					letterSpacing: '0.05em',
					color: 'white',
					backgroundColor: '#2563eb', // This is equivalent to bg-blue-600
					borderRadius: '0.5rem',
					outline: 'none'
				}}>
				Verify Email
			</Link>
		</Html>
	);
};

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseUrl();
export const sendVerificationEmail = async (email: string) => {
	const verificationToken = await generateEmailVerificationToken(email);

	const confirmLink = `${domain}/auth/verify-email?token=${verificationToken.token}`;

	const res = await resend.emails.send({
		from: 'Acme <onboarding@resend.dev>',
		to: ['hello.dev.sr@gmail.com'],
		subject: 'Verify your email',
		react: <VerificationEmail link={confirmLink} />
	});
	return res;
};
