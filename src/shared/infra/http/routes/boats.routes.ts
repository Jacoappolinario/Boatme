import { Router } from 'express';

import { CreateBoatController } from '@modules/boats/useCases/createBoat/CreateBoatController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const boatsRoutes = Router();

const createBoatController = new CreateBoatController();

boatsRoutes.post('/', ensureAuthenticated, createBoatController.handle);

export { boatsRoutes };
