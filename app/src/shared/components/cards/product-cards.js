// CategoryCardBuilder.js
import { Helper } from "../../../core/helpers/helper.js";
import { ButtonBuilder } from "../buttons/buttons.js";

class oeoeoe {
    static async createCategoryCards(categories) {
        try {
            const container = Helper.createDomElement("div", "category-cards-container");
            const ul = Helper.createDomElement("ul", "category-cards");

            categories.forEach(category => {
                const card = this.createCategoryCard(category);
                ul.appendChild(card);
            });

            container.appendChild(ul);

            return container;
        } catch (error) {
            console.error("Error creating category cards:", error);
            return null;
        }
    }

    static createCategoryCard(category, ) {
        const card = Helper.createDomElement("li", "category-card");

        const title = Helper.createDomElement("h3", "category-title");
        title.textContent = category.name;

        const categoryImage = Helper.createDomElement("img", "category-image", {
            src: category.image,
            alt: category.name
        });

        const buttonText = "Explore Category";
        const buttonAction = () => {
            const categoryId = category.id;
            window.location.hash = `category-${categoryId}`;
        };

        const button = ButtonBuilder.createButton(
            "category-button",
            buttonText,
            buttonAction
        );

        card.appendChild(title);
        card.appendChild(categoryImage);
        card.appendChild(button);

        return card;
    }
}

export { CategoryCardBuilder };