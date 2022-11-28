import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
const handler = nc();

import { prisma } from '../../../prisma';

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const posts = await prisma.post.findMany({
		orderBy: {
			updatedAt: 'desc'
		}
	});
	res.status(200).json(posts);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { title, content } = req.body;
	const post = await prisma.post.create({
		data: {
			title,
			content
		}
	});
	res.status(201).json(post);
});

export default handler;
