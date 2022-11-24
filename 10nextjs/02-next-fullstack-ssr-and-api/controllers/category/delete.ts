import catchAsyncErrors from '../../middlewares/catchAsyncErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';

export const deleteCategory = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { id } = req.query;
		if (!id) {
			return res.status(400).json({ message: 'Missing id' });
		}
		const category = await prisma.category.delete({
			where: {
				id: id as string
			}
		});

		res.status(201).json({
			success: true,
			message: 'Category deleted successfully'
		});
	}
);
