import { Router } from 'express';

import { CreateBoatController } from '@modules/boats/useCases/createBoat/CreateBoatController';

const boatsRoutes = Router();

const createBoatController = new CreateBoatController();

boatsRoutes.post('/', createBoatController.handle);

export { boatsRoutes };
