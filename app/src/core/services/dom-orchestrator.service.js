import { IntroModuleHandler } from "../../modules/intro/intro.js";
import { StoreModule } from "../../modules/store/store.js";
import { Helper } from "../helpers/helper.js";
import { LoaderManagerService } from "../helpers/loader-manage.service.js";

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
        this.handleNavigation(); // Handle initial load
    }



    static async handleNavigation() {
        let component;
        const hash = this.findQueryParam(window.location.hash, '#');
        const mainWrapper = Helper.createDomElement("div", "main_wrapper");
        const categoryId = this.findQueryParam(window.location.hash, 'category?id');
        this.controlNavigation(hash);
        this.contentElement.innerHTML = '';

        switch (hash) {
            case 'store':
                if (categoryId) {
                    component = await this.handleModuleLoad(StoreModule.renderProductsByCategory(categoryId, mainWrapper));
                } else {
                    component = await this.handleModuleLoad(StoreModule.initialize(mainWrapper));
                }
                break;
            case 'intro':
                component = await this.handleModuleLoad(IntroModuleHandler.initialize(mainWrapper));
                break;
            case 'about':
                component = await this.handleModuleLoad(About.render());
                break;
            case 'contact':
                component = await this.handleModuleLoad(Contact.render());
                break;
            case 'summary':
                component = await this.handleModuleLoad(MyCar.render());
                break;
            default:
                component = await this.handleModuleLoad(IntroModuleHandler.initialize(mainWrapper));
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

   static async handleModuleLoad(modulePromise) {
        try {
            return await LoaderManagerService.handleLoader(modulePromise);
        } catch (error) {
            console.error("There was a problem with the module you requested:", error);
            throw error;
        }
    }
}

export { DOMOrchestrator };

