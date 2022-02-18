import { Router } from 'express';

import { CreateBoatController } from '@modules/boats/useCases/createBoat/CreateBoatController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const boatsRoutes = Router();

const createBoatController = new CreateBoatController();

boatsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createBoatController.handle,
);

export { boatsRoutes };
