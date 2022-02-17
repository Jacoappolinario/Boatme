import { getRepository, Repository } from 'typeorm';

import { ICreateBoatDTO } from '@modules/boats/dtos/ICreateBoatDTO';
import { IBoatsRepository } from '@modules/boats/repositories/IBoatsRepository';

import { Boat } from '../entities/Boat';

class BoatsRepository implements IBoatsRepository {
  private repository: Repository<Boat>;

  constructor() {
    this.repository = getRepository(Boat);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateBoatDTO): Promise<Boat> {
    const boat = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(boat);

    return boat;
  }
  async findByLicensePlate(license_plate: string): Promise<Boat> {
    const boat = await this.repository.findOne({ license_plate });

    return boat;
  }
}

export { BoatsRepository };
