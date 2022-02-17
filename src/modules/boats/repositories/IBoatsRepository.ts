import { ICreateBoatDTO } from '../dtos/ICreateBoatDTO';
import { Boat } from '../infra/typeorm/entities/Boat';

interface IBoatsRepository {
  create(data: ICreateBoatDTO): Promise<Boat>;
  findByLicensePlate(license_plate: string): Promise<Boat>;
}

export { IBoatsRepository };
