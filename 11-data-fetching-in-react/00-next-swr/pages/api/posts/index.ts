import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
const handler = nc();

import { prisma } from '../../../prisma';

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const posts = await prisma.post.findMany();
	res.status(200).json(posts);
});

export default handler;
