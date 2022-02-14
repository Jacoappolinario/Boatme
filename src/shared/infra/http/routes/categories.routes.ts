import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/boats/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/boats/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/boats/useCases/listCategories/ListCategoriesController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  createCategoryController.handle,
);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
