import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateBoatController } from '@modules/boats/useCases/createBoat/CreateBoatController';
import { CreateBoatSpecificationController } from '@modules/boats/useCases/createBoatSpecification/CreateBoatSpecificationController';
import { ListAvailableBoatsController } from '@modules/boats/useCases/listAvailableBoats/ListAvailableBoatsController';
import { UploadBoatImagesController } from '@modules/boats/useCases/uploadBoatImages/UploadBoatImageController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const boatsRoutes = Router();

const createBoatController = new CreateBoatController();
const listAvailableBoatsController = new ListAvailableBoatsController();
const createBoatSpecificationController =
  new CreateBoatSpecificationController();
const uploadBoatImagesController = new UploadBoatImagesController();

const upload = multer(uploadConfig.upload('./tmp/boats'));

boatsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createBoatController.handle,
);

boatsRoutes.get('/available', listAvailableBoatsController.handle);

boatsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createBoatSpecificationController.handle,
);

boatsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadBoatImagesController.handle,
);

export { boatsRoutes };
