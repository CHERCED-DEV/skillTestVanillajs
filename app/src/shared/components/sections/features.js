import { Helper } from "../../../core/helpers/helper.js";

class FeaturesBuilder {
    static async createFeatures(featuresContentConfig) {
        try {
            const featuresConfig = await Helper.fetchContentData(featuresContentConfig);
            if (!featuresConfig) return null;

            const fragment = document.createDocumentFragment();
            featuresConfig.forEach(feature => {
                fragment.appendChild(this.createFeatureNode(feature));
            });

            return fragment;
        } catch (error) {
            console.error("Error creating features:", error);
            return null;
        }
    }

    static createFeatureNode(feature) {
        const featureContainer = Helper.createDomElement("div", "feature");
        
        const featureIcon = Helper.createDomElement("img", "feature__icon");
        featureIcon.src = feature.iconUrl;
        featureIcon.alt = feature.title;
        
        const featureTitle = Helper.createDomElement("h3", "feature__title");
        featureTitle.textContent = feature.title;
        
        const featureDescription = Helper.createDomElement("p", "feature__description");
        featureDescription.textContent = feature.description;
        
        featureContainer.appendChild(featureIcon);
        featureContainer.appendChild(featureTitle);
        featureContainer.appendChild(featureDescription);

        return featureContainer;
    }
}

export { FeaturesBuilder };
