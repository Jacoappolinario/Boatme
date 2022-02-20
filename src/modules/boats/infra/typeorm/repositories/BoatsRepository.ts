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
    specifications,
    id,
  }: ICreateBoatDTO): Promise<Boat> {
    const boat = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });

    await this.repository.save(boat);

    return boat;
  }
  async findByLicensePlate(license_plate: string): Promise<Boat> {
    const boat = await this.repository.findOne({ license_plate });

    return boat;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Boat[]> {
    const boatsQuery = await this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      boatsQuery.andWhere('brand = :brand', { brand });
    }

    if (name) {
      boatsQuery.andWhere('name = :name', { name });
    }

    if (category_id) {
      boatsQuery.andWhere('category_id = :category_id', { category_id });
    }

    const boats = await boatsQuery.getMany();

    return boats;
  }

  async findById(id: string): Promise<Boat> {
    const boat = await this.repository.findOne(id);

    return boat;
  }
}

export { BoatsRepository };
