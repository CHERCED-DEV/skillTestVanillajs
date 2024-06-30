import { FooterBuilder } from "../../common/components/layout/footer.js";
import { HeaderBuilder } from "../../common/components/layout/header.js";
import { CategoryCardBuilder } from "../../shared/components/cards/category-card.js";
import { DOMOrchestrator } from "../services/dom-orchestrator.service.js";
import { Helper } from "./helper.js";
import { LoaderManagerService } from "./loader-manage.service.js";

class UiDomManagerService {
    static async buildLayout() {
        this.uiBehaviorEvents();
        try {
            await LoaderManagerService.handleLoader(
                Promise.all([
                    Helper.createComponent('header', HeaderBuilder.createHeader),
                    Helper.createComponent('footer', FooterBuilder.createFooter)
                ])
            );
        } catch (error) {
            console.error('Error building layout:', error);
        }
    }
    static uiBehaviorEvents() {
        window.addEventListener('hashchange', () => DOMOrchestrator.handleNavigation());
        document.addEventListener("rezise", CategoryCardBuilder.handleRezise());
    }
}

export { UiDomManagerService }