import bcrypt from 'bcrypt';

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
};

// Function to compare a password with a hash
export const comparePassword = async (
	plainPassword: string,
	hashedPassword: string
): Promise<boolean> => {
	const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
	return isMatch;
};
