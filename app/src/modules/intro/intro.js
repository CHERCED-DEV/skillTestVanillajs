import { CategoryCardBuilder } from '../../shared/components/cards/category-card.js';
import { MainBannerBuilder } from '../../shared/components/main-banner/main-banner.js';

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
        const fragment = document.createDocumentFragment();

        const mainBanner = await MainBannerBuilder.createMainBanner("introBannerContent.json", () => {
            console.log("Banner button clicked!");
        });
        fragment.appendChild(mainBanner);

        const categoriesCards = await CategoryCardBuilder.createCategoryCards(categories);
        fragment.appendChild(categoriesCards);

        return fragment;
    }
}

export { IntroModuleHandler };

