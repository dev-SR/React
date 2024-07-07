import bcrypt from 'bcrypt';

// Function to hash a password
async function hashPassword(password: string): Promise<string> {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
}

// Function to compare a password with a hash
async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
	const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
	return isMatch;
}
