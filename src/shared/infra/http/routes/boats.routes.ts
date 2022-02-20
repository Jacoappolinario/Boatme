import { Router } from 'express';

import { CreateBoatController } from '@modules/boats/useCases/createBoat/CreateBoatController';
import { CreateBoatSpecificationController } from '@modules/boats/useCases/createBoatSpecification/CreateBoatSpecificationController';
import { ListAvailableBoatsController } from '@modules/boats/useCases/listAvailableBoats/ListAvailableBoatsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const boatsRoutes = Router();

const createBoatController = new CreateBoatController();
const listAvailableBoatsController = new ListAvailableBoatsController();
const createBoatSpecificationController =
  new CreateBoatSpecificationController();

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

export { boatsRoutes };
