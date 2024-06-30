import { DOMOrchestrator } from "./core/services/dom-orchestrator.service.js";
import { UiDomManagerService } from "./core/helpers/ui-dom-manager.service.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await UiDomManagerService.buildLayout(); // build basic layout
        await DOMOrchestrator.init();
    } catch (error) {
        console.error('Error initializing DOMOrchestrator:', error);
    }
});
