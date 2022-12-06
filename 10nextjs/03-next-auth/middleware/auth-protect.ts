import { NextApiRequest, NextApiResponse } from 'next/types';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export const protect = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
	const session = await unstable_getServerSession(req, res, authOptions);
	if (!session) {
		res.status(401).json({ message: 'You must be logged in.' });
		return;
	}
	next();
};
