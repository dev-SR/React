import catchAsyncErrors from '../../middlewares/catchAsyncErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';

export const updateCategory = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { id } = req.query as { id: string };
		const { name } = req.body;
		console.log(name);

		const category = await prisma.category.update({
			where: { id },
			data: { name }
		});

		res.status(200).json({
			success: true,
			category
		});
	}
);
