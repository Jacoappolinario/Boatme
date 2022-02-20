import { getRepository, Repository } from 'typeorm';

import { IBoatsImagesRepository } from '@modules/boats/repositories/IBoatsImagesRepository';

import { BoatImage } from '../entities/BoatImage';

class BoatsImagesRepository implements IBoatsImagesRepository {
  private repository: Repository<BoatImage>;

  constructor() {
    this.repository = getRepository(BoatImage);
  }

  async create(boat_id: string, image_name: string): Promise<BoatImage> {
    const boatImage = this.repository.create({
      boat_id,
      image_name,
    });

    await this.repository.save(boatImage);

    return boatImage;
  }
}

export { BoatsImagesRepository };
