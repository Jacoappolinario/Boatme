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
    id,
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
      id,
    });

    this.boats.push(boat);

    return boat;
  }
  async findByLicensePlate(license_plate: string): Promise<Boat> {
    return this.boats.find(boat => boat.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Boat[]> {
    const all = this.boats.filter(boat => {
      if (
        boat.available === true ||
        (brand && boat.brand === brand) ||
        (category_id && boat.category_id === category_id) ||
        (name && boat.name === name)
      ) {
        return boat;
      }

      return null;
    });

    return all;
  }

  async findById(id: string): Promise<Boat> {
    return this.boats.find(boat => boat.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.boats.findIndex(boat => boat.id === id);
    this.boats[findIndex].available = available;
  }
}
export { BoatsRepositoryInMemory };
