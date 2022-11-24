import nc from 'next-connect';
// handle server error middleware
import onError from '../../middlewares/errors';
// import the notes controller for postingNotes and fetching all notes
import { createCategory } from '../../controllers/CategoryController';

// initiate next-connect with error middleware
const handler = nc({ onError });

// handler request from "api/notes" endpoint
// handle post request for posting a note
handler.post(createCategory);

export default handler;
