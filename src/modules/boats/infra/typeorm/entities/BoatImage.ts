import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('boats_image')
class BoatImage {
  @PrimaryColumn()
  id: string;

  @Column()
  boat_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { BoatImage };
