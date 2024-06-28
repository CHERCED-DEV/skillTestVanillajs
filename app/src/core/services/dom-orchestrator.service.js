import { HeaderBuilder } from "../../common/components/layout/header.js";
import { FooterBuilder } from "../../common/components/layout/footer.js";
import { Helper } from "../helpers/helper.js";
import { IntroModuleHandler } from "../../modules/intro/intro.js";
import { ProductService } from "./product.service.js";
import { MainBannerBuilder } from "../../shared/components/main-banner/main-banner.js";

/**
 * Class to orchestrate DOM component creation and management.
 */
class DOMOrchestrator {
    static async init() {
        this.contentElement = document.getElementById('main');
        if (!this.contentElement) {
            console.error(`Container with ID '${this.containerId}' not found.`);
            return;
        }
        window.addEventListener('hashchange', () => this.handleNavigation());
        await this.buildLayout(); // build basic layout
        this.handleNavigation(); // Handle initial load
    }

    static productService = new ProductService('https://api.escuelajs.co/api/v1', {
        'Content-Type': 'application/json',
    });

    static async handleNavigation() {
        const hash = DOMOrchestrator.findQueryParam(window.location.hash, '#');
        this.contentElement.innerHTML = '';
        let component;
        const categoryId = DOMOrchestrator.findQueryParam(window.location.hash, 'category?id');
        DOMOrchestrator.controlNavigation(hash);
        switch (hash) {
            case 'store':
                component = Store.render();
                break;
            case 'intro':
                if (categoryId) {
                    const categoryInventory = await DOMOrchestrator.productService.fetchProductsByCategory(categoryId)
                    component = await IntroModuleHandler.renderProductsByCategory(categoryInventory);
                } else {
                    const fragment = document.createDocumentFragment();
                    const mainBanner = await MainBannerBuilder.createMainBanner("introBannerContent.json", () => {
                        console.log("Banner button clicked!");
                    });
                    const mainWrapper = Helper.createDomElement("div", "main_wrapper");
                    const introModule = await IntroModuleHandler.initialize(DOMOrchestrator.productService);
                    mainWrapper.appendChild(introModule);
                    fragment.appendChild(mainBanner);
                    fragment.appendChild(mainWrapper);
                    component = fragment;
                }
                break;
            case 'about':
                component = About.render();
                break;
            case 'contact':
                component = Contact.render();
                break;
            case 'summary':
                component = MyCar.render();
                break;
            default:
                if (categoryId) {
                    const categoryInventory = await DOMOrchestrator.productService.fetchProductsByCategory(categoryId)
                    component = await IntroModuleHandler.renderProductsByCategory(categoryInventory);
                } else {
                    const fragment = document.createDocumentFragment();
                    const mainBanner = await MainBannerBuilder.createMainBanner("introBannerContent.json", () => {
                        console.log("Banner button clicked!");
                    });
                    const mainWrapper = Helper.createDomElement("div", "main_wrapper");
                    const introModule = await IntroModuleHandler.initialize(DOMOrchestrator.productService);
                    mainWrapper.appendChild(introModule);
                    fragment.appendChild(mainBanner);
                    fragment.appendChild(mainWrapper);
                    component = fragment;
                }
                break;
        }


        if (component) {
            this.replaceMainContent(component);
        }
    }

    static controlNavigation(hash) {
        const navElements = document.getElementsByClassName('header_nav-item');
        const navElement = document.getElementById(hash);
        if (hash) {
            const navElementsArray = Array.from(navElements);
            navElementsArray.forEach(navItem => {
                navItem.classList.contains('selected') ? navItem.classList.remove('selected') : null;
            });
            navElement.classList.add('selected');
        } else {
            document.getElementById("intro").classList.add('selected');
        }
    }

    static async replaceMainContent(newComponent) {
        this.contentElement.innerHTML = '';
        Helper.createModule(this.contentElement, newComponent);
    }

    static findQueryParam(hash, param) {
        const parts = hash.split(/[&\/]/);

        if (param === '#') {
            const part = parts.find(part => part.startsWith('#'));
            return part ? part.slice(1) : null;
        } else {
            const part = parts.find(part => part.includes(param));
            if (part) {
                const [key, value] = part.split('=');
                if (key === param) {
                    return value;
                }
            }
            return null;
        }
    }

    static async buildLayout() {
        const loader = document.getElementById('loader');
        const pageWrapper = document.getElementById('pageWrapper');

        try {
            await Helper.createComponent('header', HeaderBuilder.createHeader);
            await Helper.createComponent('footer', FooterBuilder.createFooter);
            pageWrapper.classList.add('loaded');
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.display = 'none';
            }, 3500);
        } catch (error) {
            console.error('Error building layout:', error);
        }
    }

}

export { DOMOrchestrator };