import { LoaderManagerService } from "../../core/helpers/loader-manage.service.js";
import { MainBannerBuilder } from "../../shared/components/main-banner/main-banner.js";
import { TestimonialsBuilder } from "../../shared/components/sections/testimonials.js";
import { FeaturesBuilder } from "../../shared/components/sections/features.js";
import { ArticlesBuilder } from "../../shared/components/sections/articles.js";

class IntroModuleHandler {
    static async initialize(mainWrapper) {
        try {
            return await LoaderManagerService.handleLoader(this.renderIntroModule(mainWrapper));
        } catch (error) {
            console.error('Error initializing Intro module:', error);
            return null;
        }
    }

    static async renderIntroModule(mainWrapper) {
        try {
            const fragment = document.createDocumentFragment();


            const mainBanner = await MainBannerBuilder.createMainBanner("introBannerContent.json", () => {
                window.location.hash = "#store";
            });


            const testimonials = await TestimonialsBuilder.createTestimonials('testimonialsHomeContent.json');
            const features = await FeaturesBuilder.createFeatures('featuresHomeContent.json');
            const articles = await ArticlesBuilder.createArticles('articlesHomeContent.json');


            fragment.appendChild(mainBanner);

            mainWrapper.appendChild(testimonials);
            mainWrapper.appendChild(features);
            mainWrapper.appendChild(articles);


            fragment.appendChild(mainWrapper);

            return fragment;
        } catch (error) {
            console.error('Error in renderIntroModule:', error);
            return null;
        }
    }
}

export { IntroModuleHandler };
