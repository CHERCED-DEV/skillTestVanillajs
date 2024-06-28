import { Helper } from "../../../core/helpers/helper.js";
import { ButtonBuilder } from "../buttons/buttons.js";

class CategoryCardBuilder {
    static async createCategoryCards(categories) {
        try {
            const container = Helper.createDomElement("div", "category-cards-container");
            const ul = Helper.createDomElement("ul", "category-cards");

            const categoriesWithAssets = categories.map(category => ({
                ...category,
                image: `app/assets/imgs/categories/${category.name.toLowerCase()}.jpeg`
            }));

            const interestingCategories  = ["books","clothes","electronics","furniture","miscellaneous","shoes"]

            const categoriesToDisplay = categoriesWithAssets.filter(category => {
                return interestingCategories.includes(category.name.toLowerCase());
            });

            categoriesToDisplay.forEach(category => {
                const cardElement = this.createCategoryCard(category);
                ul.appendChild(cardElement);
            });

            container.appendChild(ul);

            const leftButton = ButtonBuilder.createButton(
                ["nav-button", "left-button"],
                "&#9664",  // Left arrow
                () => ul.scrollBy({ left: -100, behavior: 'smooth' }),
                { type: "button" }
            );

            const rightButton = ButtonBuilder.createButton(
                ["nav-button", "right-button"],
                "&#9654",  // Right arrow
                () => ul.scrollBy({ left: 100, behavior: 'smooth' }),
                { type: "button" }
            );

            container.appendChild(leftButton);
            container.appendChild(rightButton);

            return container;
        } catch (error) {
            console.error("Error creating category cards:", error);
            throw error;
        }
    }

    static createCategoryCard(category) {
        try {
            const card = Helper.createDomElement("li", "category-card");

            const title = Helper.createDomElement("h3", "category-title");
            title.textContent = category.name;

            const imageBg = Helper.createDomElement("div", "category-image");
            imageBg.style.backgroundImage = `url(${category.image})`;
            imageBg.style.backgroundSize = "cover";
            imageBg.style.backgroundPosition = "center";
            imageBg.style.backgroundRepeat = "no-repeat";

            const button = ButtonBuilder.createButton(
                "category-button",
                "Explore Category",
                () => {
                    window.location.href = `#intro/category?id=${category.id}`;
                },
                {
                    type: "button"
                }
            );

            card.appendChild(title);
            card.appendChild(imageBg);
            card.appendChild(button);

            return card;
        } catch (error) {
            console.error("Error creating category card:", error);
            throw error; 
        }
    }
}

export { CategoryCardBuilder };
