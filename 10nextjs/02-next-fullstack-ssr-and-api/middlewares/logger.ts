import { NextApiRequest, NextApiResponse } from "next";

export const Logger = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
	console.log('Request: ', req.method, req.url);
	next();
}