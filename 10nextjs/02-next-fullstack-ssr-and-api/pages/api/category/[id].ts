import nc from 'next-connect';
// handle server error middleware
import onError from '../../../middlewares/errors';
import { deleteCategory, getSingleCategory, updateCategory } from '../../../controllers/category';
import { Logger } from '../../../middlewares/logger';

// initiate next-connect with error middleware
const handler = nc({ onError });

// handler request from "api/notes" endpoint
// handle post request for posting a note
// use logger
handler.use(Logger);
handler.delete(deleteCategory);
handler.put(updateCategory);
handler.get(getSingleCategory);

export default handler;
