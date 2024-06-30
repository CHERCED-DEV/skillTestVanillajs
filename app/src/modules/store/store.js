import { LoaderManagerService } from "../../core/helpers/loader-manage.service.js";
import { ProductService } from "../../core/services/product.service.js";
import { CategoryCardBuilder } from "../../shared/components/cards/category-card.js";
import { ProductsCardsBuilder } from "../../shared/components/cards/product-cards.js";
import { MainBannerBuilder } from "../../shared/components/main-banner/main-banner.js";

class StoreModule {
    static productService = new ProductService('https://api.escuelajs.co/api/v1', {
        'Content-Type': 'application/json',
    });

    static async initialize(mainWrapper) {
        try {
            return await LoaderManagerService.handleLoader(this.storeIntroModule(mainWrapper));
        } catch (error) {
            console.error('Error initializing Intro module:', error);
            return null;
        }
    }

    static async storeIntroModule(mainWrapper) {
        try {
            const fragment = document.createDocumentFragment();
            const mainBanner = await MainBannerBuilder.createMainBanner("introBannerContent.json", () => {
                console.log("Banner button clicked!");
            });

            const storeModule = await this.renderCategories();

            fragment.appendChild(mainBanner);
            mainWrapper.appendChild(storeModule);
            fragment.appendChild(mainWrapper);

            return fragment;
        } catch (error) {
            console.error('Error in storeIntroModule:', error);
            return null;
        }
    }

    static async renderCategories() {
        try {
            const categories = await this.productService.fetchAllCategories();
            const categoriesCards = await CategoryCardBuilder.createCategoryCards(categories);
            return categoriesCards;
        } catch (error) {
            console.error('Error in renderCategories:', error);
            return null;
        }
    }

    static async renderProductsByCategory(categoryId, mainWrapper) {
        try {
            await LoaderManagerService.handleLoader(
                (async () => {
                    const categoryInventory = await this.productService.fetchProductsByCategory(categoryId);
                    const productCards = await ProductsCardsBuilder.createProductsCards(categoryInventory);
                    mainWrapper.appendChild(productCards);
                })()
            );
            return mainWrapper;
        } catch (error) {
            console.error('Error initializing store products module:', error);
            return null;
        }
    }
}

export { StoreModule };
