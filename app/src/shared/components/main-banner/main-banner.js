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
        if (window.innerWidth > 1248) {
            const bannerHeigth = MainBannerBuilder.bannerSizeRecalc();
            bannerContainer.style.height = `${bannerHeigth}px`
        }
        bannerContainer.style.backgroundImage = `url(${bannerConfig.imageUrl})`;
        bannerContainer.style.backgroundSize = "cover";
        bannerContainer.style.backgroundPosition = "center";
        bannerContainer.style.backgroundRepeat = "no-repeat";

        const bannerText = Helper.createDomElement("div", "main-banner__text");
        bannerText.textContent = bannerConfig.text;

        const bannerButton = ButtonBuilder.createButton(
            "main__banner--button", 
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

    static bannerSizeRecalc() {
        const realScreen = window.innerHeight;
        console.log(realScreen);
        return realScreen - 80;
    }
}

export { MainBannerBuilder };
