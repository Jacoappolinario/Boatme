import { inject, injectable } from 'tsyringe';

import { IBoatsImagesRepository } from '@modules/boats/repositories/IBoatsImagesRepository';

interface IRequest {
  boat_id: string;
  images_name: string[];
}

@injectable()
class UploadBoatImagesUseCase {
  constructor(
    @inject('BoatsImagesRepository')
    private boatsImagesRepository: IBoatsImagesRepository,
  ) {}

  async execute({ boat_id, images_name }: IRequest): Promise<void> {
    images_name.map(async image => {
      await this.boatsImagesRepository.create(boat_id, image);
    });
  }
}

export { UploadBoatImagesUseCase };
