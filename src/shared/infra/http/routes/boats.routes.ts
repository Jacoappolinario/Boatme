import { Router } from 'express';

import { CreateBoatController } from '@modules/boats/useCases/createBoat/CreateBoatController';
import { ListAvailableBoatsController } from '@modules/boats/useCases/listAvailableBoats/ListAvailableBoatsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const boatsRoutes = Router();

const createBoatController = new CreateBoatController();
const listAvailableBoatsController = new ListAvailableBoatsController();

boatsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createBoatController.handle,
);

boatsRoutes.get('/available', listAvailableBoatsController.handle);

export { boatsRoutes };
