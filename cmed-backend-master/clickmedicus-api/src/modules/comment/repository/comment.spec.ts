import { CommentRepository } from './comments.repository';

describe('Comment', () => {
	it('should be defined', () => {
		expect(new CommentRepository()).toBeDefined();
	});
});
