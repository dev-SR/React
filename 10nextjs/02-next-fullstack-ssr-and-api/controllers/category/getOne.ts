import catchAsyncErrors from '../../middlewares/catchAsyncErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';

export const getSingleCategory = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { id } = req.query;
		if (!id) {
			return res.status(400).json({ message: 'Missing id' });
		}
		const category = await prisma.category.findUnique({
			where: {
				id: id as string
			}
		});
		console.log(category);

		res.status(200).json({
			success: true,
			...category
		});
	}
);
