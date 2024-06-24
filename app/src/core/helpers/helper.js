class Helper {
    /**
     * Creates a component inside a specific container.
     * @param {string} mainContainer - ID of the container where the component will be added.
     * @param {function} module - Constructor function of the component.
     */
    static async createModule(mainContainer, module) {
        return new Promise(async (resolve, reject) => {
            try {
                if (module instanceof HTMLElement || module instanceof DocumentFragment) {
                    mainContainer.appendChild(module);
                    resolve();
                } else {
                    console.error(`Component constructor for container '${containerId}' did not return a valid HTMLElement.`);
                    reject(new Error(`Component constructor for container '${containerId}' did not return a valid HTMLElement.`));
                }
            } catch (error) {
                console.error(`Error creating component in container '${containerId}':`, error);
                reject(error);
            }
        });
    }
    /**
     * Creates a component inside a specific container.
     * @param {string} containerId - ID of the container where the component will be added.
     * @param {function} componentConstructor - Constructor function of the component.
     */
    static async createComponent(containerId, componentConstructor) {
        return new Promise(async (resolve, reject) => {
            try {
                const container = document.getElementById(containerId);
                if (!container) {
                    console.error(`Container with ID '${containerId}' not found.`);
                    reject(new Error(`Container with ID '${containerId}' not found.`));
                    return;
                }

                const component = await componentConstructor(container); // must be async

                if (component instanceof HTMLElement || component instanceof DocumentFragment) {
                    container.appendChild(component);
                    resolve();
                } else {
                    console.error(`Component constructor for container '${containerId}' did not return a valid HTMLElement.`);
                    reject(new Error(`Component constructor for container '${containerId}' did not return a valid HTMLElement.`));
                }
            } catch (error) {
                console.error(`Error creating component in container '${containerId}':`, error);
                reject(error);
            }
        });
    }

    /**
     * Creates and returns a DOM element with the specified tag, class, and attributes.
     * @param {string} domTag - The tag name of the DOM element to create.
     * @param {string} className - The class to add to the DOM element.
     * @param {Object} [attributes={}] - An optional object containing key-value pairs of attributes to set on the DOM element.
     * @returns {HTMLElement|null} The created DOM element or null if creation failed.
     */
    static createDomElement(domTag, className, attributes = {}) {
        let newElement;

        try {
            newElement = document.createElement(domTag);

            if (!(newElement instanceof HTMLElement)) {
                console.error('Failed to create a valid HTMLElement');
                return null;
            }

            if (className) {
                newElement.classList.add(className);
            }

            if (attributes && typeof attributes === 'object') {
                for (const [key, value] of Object.entries(attributes)) {
                    newElement.setAttribute(key, value);
                }
            }
        } catch (error) {
            console.error('Error creating element:', error);
            return null;
        }

        return newElement;
    }

    /**
     * Fetches content data from a specified JSON file.
     * @param {string} componentConfig - The path to the JSON file.
     * @returns {Object|null} The fetched JSON content, or null if there was an error.
     */
    static async fetchContentData(componentConfig) {
        try {
            const response = await fetch(`/app/src/core/data/${componentConfig}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching content from ${componentConfig}:`, error);
            return null;
        }
    }

    /**
     * Static method for fetching API data
     * @param {string} apiUrl - The API endpoint URL.
     * @param {Object} [headers={}] - An optional object containing headers to include in the fetch request.
     * @param {string} errorMessage - Message when API fail.
     * @returns {Object|null} The fetched JSON content, or null if there was an error.
     */
    static async fetchApi(apiUrl, headers = {}, errorMessage) {
        try {
            const response = await fetch(apiUrl, {
                headers: headers
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error(errorMessage, error);
            return null;
        }
    }
}

export { Helper };
