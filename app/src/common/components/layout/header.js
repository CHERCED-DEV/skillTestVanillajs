import { Helper } from "../../../core/helpers/helper.js";

class HeaderBuilder {
    static async createHeader() {
        try {
            const headerContent = await Helper.fetchContentData('headerContent.json');
            if (!headerContent) return null;

            const fragment = document.createDocumentFragment();

            fragment.appendChild(HeaderBuilder.createHeaderContainerImg(headerContent.headerImage));
            fragment.appendChild(HeaderBuilder.createHeaderNavigation(headerContent.navItems));

            const headerWrapper = Helper.createDomElement("div", "header__wrapper");
            headerWrapper.appendChild(fragment);

            return headerWrapper;
        } catch (error) {
            console.error("Error creating header:", error);
            return null;
        }
    }

    static createHeaderContainerImg(imageConfig) {
        const headerImgContainer = Helper.createDomElement("a", "header_container-img");
        headerImgContainer.href = imageConfig.link;
        const headerImgTag = Helper.createDomElement("img", "header_img", {
            src: imageConfig.src,
            alt: imageConfig.alt
        });
        headerImgContainer.appendChild(headerImgTag);
        return headerImgContainer;
    }

    static createHeaderNavigation(navItems) {
        const headerNav = Helper.createDomElement("nav", "header_nav");
        const headerListNav = Helper.createDomElement("ul", "header_nav-list");

        navItems.forEach(item => {
            const listItem = Helper.createDomElement("li", "header_nav-item");
            listItem.id = item.id;
            const link = Helper.createDomElement("a", "header_nav-link", { href: `#${item.id}` });
            link.textContent = item.text;
            listItem.appendChild(link);
            headerListNav.appendChild(listItem);
        });

        headerNav.appendChild(headerListNav);
        return headerNav;
    }
}

export { HeaderBuilder };
