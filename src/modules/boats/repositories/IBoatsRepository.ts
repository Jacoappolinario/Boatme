import { ICreateBoatDTO } from '../dtos/ICreateBoatDTO';
import { Boat } from '../infra/typeorm/entities/Boat';

interface IBoatsRepository {
  create(data: ICreateBoatDTO): Promise<Boat>;
  findByLicensePlate(license_plate: string): Promise<Boat>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Boat[]>;
  findById(id: string): Promise<Boat>;
}

export { IBoatsRepository };
