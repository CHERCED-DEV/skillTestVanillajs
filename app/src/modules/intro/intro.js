import { CategoryCardBuilder } from '../../shared/components/cards/category-card.js';
import { ProductsCardsBuilder } from '../../shared/components/cards/product-cards.js';

class IntroModuleHandler {
    static async initialize(productService) {
        try {
            let categories = await productService.fetchAllCategories();
            return await this.renderIntroModule(categories);
        } catch (error) {
            console.error('Error initializing Intro module:', error);
            return null;
        }
    }

    static async renderIntroModule(categories) {
        const categoriesCards = await CategoryCardBuilder.createCategoryCards(categories);
        return categoriesCards;
    }

    static async renderProductsByCategory(productsByCategory) {
        const productCards = await ProductsCardsBuilder.createProductsCards(productsByCategory);
        return productCards;
    }
}

export { IntroModuleHandler };

