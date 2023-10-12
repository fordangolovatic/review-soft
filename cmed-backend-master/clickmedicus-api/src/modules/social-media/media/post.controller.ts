import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Patch
} from '@nestjs/common';
import { PostService } from './post.service';
import { User } from '@core/decorators/user.decorator';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { PostsReponse } from './dto/posts.response.dto';
import { PostReponse } from './dto/post.response.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	/**
	 * Returns all records of post.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Returns all records of post.' },
		apiResponseData: { status: 200, type: PostsReponse },
		apiSecurityData: 'accessToken'
	})
	@Get('')
	getAll(@User() user: UserAccountEntity): Promise<PostEntity[]> {
		return this.postService.getList();
	}

	/**
	 * Returns post by Id.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Returns post by id.' },
		apiResponseData: { status: 200, type: PostsReponse },
		apiSecurityData: 'accessToken'
	})
	@Get('/:id')
	getPostById(
		@User() user: UserAccountEntity,
		@Param('id') postId: string
	): Promise<PostEntity> {
		return this.postService.getPostById(+postId);
	}

	/**
	 * Updates post by Id.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Update post by id.' },
		apiResponseData: { status: 200, type: PostsReponse },
		apiSecurityData: 'accessToken',
		apiBodyData: { type: UpdatePostDto }
	})
	@Patch('/:id')
	updatePostById(
		@User() user: UserAccountEntity,
		@Param('id') postId: string,
		@Body() updatePostDto: UpdatePostDto
	): Promise<UpdateResult> {
		return this.postService.updatePostById(+postId, updatePostDto);
	}

	/**
	/**
	 * Create new post.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Crate a new post' },
		apiResponseData: { status: 201, type: PostReponse },
		apiSecurityData: 'accessToken'
	})
	@Post('')
	create(
		@Body() createPostDto: CreatePostDto,
		@User() user: UserAccountEntity
	): Promise<any> {
		return this.postService.createPost(createPostDto, user);
	}

	/**
	/**
	 * Delete post by id
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Delete post by id' },
		apiResponseData: { status: 204 },
		apiSecurityData: 'accessToken'
	})
	@Delete('/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.postService.deletePost(+id);
	}
}
