import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { prisma } from '../../../prisma';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query as { id: string };
	const comments = await prisma.comment.findMany({
		where: {
			postId: id
		}
	});
	res.json(comments);
});

export default handler;
