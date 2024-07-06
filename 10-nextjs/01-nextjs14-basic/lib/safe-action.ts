import { createSafeActionClient } from 'next-safe-action';

export const AC = createSafeActionClient({
	// Can also be an async function.
	handleServerErrorLog(originalError, utils) {
		// And also log it to the console.
		console.error('Action error:', originalError.message);
	},
	// Can also be an async function.
	handleReturnedServerError(e, utils) {
		if (e.cause == 'custom') {
			return e.message;
		}

		return 'Oh no, something went wrong!';
	}
});
