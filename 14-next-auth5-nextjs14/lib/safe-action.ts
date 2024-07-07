import { createSafeActionClient } from 'next-safe-action';

// Define a reusable custom error class
export class ActionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'MyActionError';
		this.cause = 'MyActionError';
	}
}

export const AC = createSafeActionClient({
	// Can also be an async function.
	handleServerErrorLog(originalError, utils) {
		// And also log it to the console.
		console.error('Action error:', originalError.message);
	},
	// Can also be an async function.
	handleReturnedServerError(e, utils) {
		// if (e instanceof ActionError) {
		// 	return e.message;
		// }
		if (e.cause == 'MyActionError') {
			return e.message;
		}

		return 'Oh no, something went wrong!';
	}
});
