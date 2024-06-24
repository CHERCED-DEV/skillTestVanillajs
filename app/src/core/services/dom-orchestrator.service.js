import { HeaderBuilder } from "../../common/components/layout/header.js";
import { FooterBuilder } from "../../common/components/layout/footer.js";
import { Helper } from "../helpers/helper.js";
import { IntroModuleHandler } from "../../modules/intro/intro.js";
import { ProductService } from "./product.service.js";

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
        const hash = window.location.hash.replace('#', '');
        this.contentElement.innerHTML = '';
        let component;

        switch (hash) {
            case 'store':
                component = Store.render();
                break;
            case 'intro':
                component = await IntroModuleHandler.initialize(DOMOrchestrator.productService);
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
                component = await IntroModuleHandler.initialize(DOMOrchestrator.productService);
                break;
        }


        if (component) {
            Helper.createModule(this.contentElement, component)
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