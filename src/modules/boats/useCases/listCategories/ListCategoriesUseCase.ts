import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/boats/infra/typeorm/entities/Category';
import { ICategoryRepository } from '@modules/boats/repositories/ICreateCategoryDTO';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
