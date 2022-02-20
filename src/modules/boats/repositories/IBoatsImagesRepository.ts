import { BoatImage } from '../infra/typeorm/entities/BoatImage';

interface IBoatsImagesRepository {
  create(boat_id: string, image_name: string): Promise<BoatImage>;
}

export { IBoatsImagesRepository };
