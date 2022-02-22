import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { boatsRoutes } from './boats.routes';
import { categoriesRoutes } from './categories.routes';
import { rentalRoutes } from './rental.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/boats', boatsRoutes);
router.use('/rentals', rentalRoutes);
router.use(authenticateRoutes);

export { router };
