import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadBoatImagesUseCase } from './UploadBoatImageUseCase';

interface IFiles {
  filename: string;
}

class UploadBoatImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadBoatImagesUseCase = container.resolve(UploadBoatImagesUseCase);

    const images_name = images.map(file => file.filename);

    await uploadBoatImagesUseCase.execute({
      boat_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadBoatImagesController };
