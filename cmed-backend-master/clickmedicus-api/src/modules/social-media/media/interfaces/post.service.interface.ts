

/**
 * A service contract which must be implemented by [FeatureService]{@link PostService}.
 */
export interface PostServiceInterface {
	/**
	 * Returns a list of all the records of feature.
	 */
	create();

	/**
	 * Delete feature based on the given feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number);
}
