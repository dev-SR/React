import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { prisma } from '../../../prisma';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query as { id: string };
	const post = await prisma.post.findUnique({
		where: {
			id
		}
	});
	res.json(post);
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query as { id: string };
	const post = await prisma.post.delete({
		where: {
			id
		}
	});
	res.json(post);
});

export default handler;
