import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../prisma';

export const createCategory = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		console.log(req.body);
		const { name } = req.body;

		const category = await prisma.category.create({
			data: {
				name
			}
		});
		res.status(201).json(category);
	}
);
