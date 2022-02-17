import { ICreateBoatDTO } from '@modules/boats/dtos/ICreateBoatDTO';
import { Boat } from '@modules/boats/infra/typeorm/entities/Boat';

import { IBoatsRepository } from '../IBoatsRepository';

class BoatsRepositoryInMemory implements IBoatsRepository {
  boats: Boat[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
  }: ICreateBoatDTO): Promise<Boat> {
    const boat = new Boat();

    Object.assign(boat, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
    });

    this.boats.push(boat);

    return boat;
  }
  async findByLicensePlate(license_plate: string): Promise<Boat> {
    return this.boats.find(boat => boat.license_plate === license_plate);
  }
}
export { BoatsRepositoryInMemory };
