import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteDoctorsController } from './favorite-doctors.controller';

describe('FavoriteDoctorsController', () => {
  let controller: FavoriteDoctorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteDoctorsController],
    }).compile();

    controller = module.get<FavoriteDoctorsController>(FavoriteDoctorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
