// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	name: string;
};

import { protect } from 'middleware/auth-protect';
import nc from 'next-connect';
const handler = nc();
handler.use(protect);
handler.get((req: NextApiRequest, res: NextApiResponse<Data>) => {
	res.status(200).json({ name: 'John Doe' });
});

export default handler;
