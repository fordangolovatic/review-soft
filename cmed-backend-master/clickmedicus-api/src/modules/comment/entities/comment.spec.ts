import { CommentEntity } from './comment.entity';

describe('Comment', () => {
	it('should be defined', () => {
		expect(new CommentEntity()).toBeDefined();
	});
});
