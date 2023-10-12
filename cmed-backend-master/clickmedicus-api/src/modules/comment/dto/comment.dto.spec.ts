import { CreateCommentDto } from './create-comment.dto';

describe('CommentDto', () => {
	it('should be defined', () => {
		expect(new CreateCommentDto()).toBeDefined();
	});
});
