export const generateRandomID = () => {
	const randomNumber = Math.random();
	const randomID = Math.floor(randomNumber * 1000000);
	return randomID;
};
