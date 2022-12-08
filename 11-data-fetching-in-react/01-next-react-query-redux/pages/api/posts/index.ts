import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
const handler = nc({
	onError(error, req, res: NextApiResponse) {
		res.status(500).json({ error: error.message });
	}
});

import { prisma } from '../../../prisma';

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 3;
	const skip = (page - 1) * limit;

	const [posts, count] = await prisma.$transaction([
		prisma.post.findMany({
			skip,
			take: limit,
			orderBy: {
				updatedAt: 'desc'
			}
		}),
		prisma.post.count()
	]);

	const totalPages = Math.ceil(count / limit);
	const hasMore = page < totalPages;
	const nextPage = hasMore ? page + 1 : null;
	const prevPage = page > 1 ? page - 1 : null;
	const links = {
		nextPage,
		prevPage,
		hasMore,
		totalPages
	};

	res.json({ posts, links });
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { title, content } = req.body;

	console.log('title', title);

	const post = await prisma.post.create({
		data: {
			title,
			content
		}
	});
	res.status(201).json(post);
});

export default handler;
