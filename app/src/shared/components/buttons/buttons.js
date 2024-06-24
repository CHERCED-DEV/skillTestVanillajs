import { Helper } from "../../../core/helpers/helper.js";

class ButtonBuilder {
    /**
     * Creates a button element with the specified configurations.
     * @param {string} label - The text to be displayed on the button.
     * @param {string} btnClass - className button
     * @param {function} onClickAction - The callback function to be executed on button click.
     * @param {object} [attributes] - Additional attributes to be added to the button.
     * @returns {HTMLElement} The created button element.
     */
    static createButton(btnClass, label, onClickAction, attributes = {}) {
        const button = Helper.createDomElement("button", btnClass, attributes);
        button.textContent = label;
        // Add the click event listener
        if (onClickAction) {
            button.onclick = onClickAction;
        }

        return button;
    }
}

export { ButtonBuilder };