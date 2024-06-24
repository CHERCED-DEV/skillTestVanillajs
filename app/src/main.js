import { DOMOrchestrator } from "./core/services/dom-orchestrator.service.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await DOMOrchestrator.init();
    } catch (error) {
        console.error('Error initializing DOMOrchestrator:', error);
    }
});
