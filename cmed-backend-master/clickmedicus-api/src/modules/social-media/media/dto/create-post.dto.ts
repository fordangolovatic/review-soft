import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

/**
 * A DTO class for Post.
 */
export class CreatePostDto {
	/**
	 * Content
	 */
	@IsDefined()
	@IsString()
	content: string;

	@IsDefined()
	@IsString()
	image: string;

	@IsDefined()
	@IsString()
	video: string;

	@IsDefined()
	@IsNotEmpty()
	article: number;
}
