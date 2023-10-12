import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteArtilcesServiceService } from './favorite-artilce.service';

describe('FavoriteArtilceServiceService', () => {
	let service: FavoriteArtilcesServiceService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FavoriteArtilcesServiceService]
		}).compile();

		service = module.get<FavoriteArtilcesServiceService>(
			FavoriteArtilcesServiceService
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
