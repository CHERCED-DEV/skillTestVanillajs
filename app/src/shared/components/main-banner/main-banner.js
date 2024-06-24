import { Helper } from "../../../core/helpers/helper.js";
import { ButtonBuilder } from "../buttons/buttons.js";

class MainBannerBuilder {
    static async createMainBanner(bannerConfig, buttonAction) {
        try {
            const mainBannerConfig = await Helper.fetchContentData(bannerConfig);
            if (!mainBannerConfig) return null;

            const fragment = document.createDocumentFragment();
            fragment.appendChild(MainBannerBuilder.createMainBannerNode(mainBannerConfig, buttonAction));

            return fragment;
        } catch (error) {
            console.error("Error creating main banner:", error);
            return null;
        }
    }

    static createMainBannerNode(bannerConfig, buttonAction) {
        const bannerContainer = Helper.createDomElement("div", "main-banner");

        bannerContainer.style.backgroundImage = `url(${bannerConfig.imageUrl})`;
        bannerContainer.style.backgroundSize = "cover";
        bannerContainer.style.backgroundPosition = "center";
        bannerContainer.style.backgroundRepeat = "no-repeat";

        const bannerText = Helper.createDomElement("div", "banner-text");
        bannerText.textContent = bannerConfig.text;

        const bannerButton = ButtonBuilder.createButton(
            "banner-button", 
            bannerConfig.buttonLabel,
            buttonAction, 
            {
                type: "button",
            }
        )

        bannerContainer.appendChild(bannerText);
        bannerContainer.appendChild(bannerButton);

        return bannerContainer;
    }
}

export { MainBannerBuilder };
