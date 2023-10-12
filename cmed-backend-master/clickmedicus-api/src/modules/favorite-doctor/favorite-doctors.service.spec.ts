import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteDoctorsService } from './favorite-doctors.service';

describe('FavoriteDoctorsService', () => {
  let service: FavoriteDoctorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteDoctorsService],
    }).compile();

    service = module.get<FavoriteDoctorsService>(FavoriteDoctorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
