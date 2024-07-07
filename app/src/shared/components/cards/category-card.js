import { Helper } from "../../../core/helpers/helper.js";
import { ButtonBuilder } from "../buttons/buttons.js";

class CategoryCardBuilder {
    static async createCategoryCards(categories) {
        try {
            const container = Helper.createDomElement("div", "category-cards_container");
            const animatedBg = CategoryCardBuilder.animatedBgBuilder();
            container.appendChild(animatedBg);

            const containerWrapper = Helper.createDomElement("div", "category-cards_wrapper");
            const ul = Helper.createDomElement("ul", "category-cards");

            const categoriesWithAssets = categories.map(category => ({
                ...category,
                image: `app/assets/imgs/categories/${category.name.toLowerCase()}.jpeg`
            }));

            const interestingCategories = ["books", "clothes", "electronics", "furniture", "miscellaneous", "shoes"]

            const categoriesToDisplay = categoriesWithAssets.filter(category => {
                return interestingCategories.includes(category.name.toLowerCase());
            });

            categoriesToDisplay.forEach((category, i) => {
                const cardElement = this.createCategoryCard(category, i);
                ul.appendChild(cardElement);
            });

            containerWrapper.appendChild(ul);

            const navContainer = Helper.createDomElement("div", "category-cards_nav--buttons");

            const leftButton = ButtonBuilder.createButton(
                ["nav-button", "left-button"],
                "<",  // Left arrow
                () => this.handleCardsNavigation("left"),
                { type: "button" }
            );
            const rightButton = ButtonBuilder.createButton(
                ["nav-button", "right-button"],
                ">",  // Right arrow
                () => this.handleCardsNavigation("right"),
                { type: "button" }
            );

            navContainer.appendChild(leftButton);
            navContainer.appendChild(rightButton);

            containerWrapper.appendChild(navContainer);
            container.appendChild(containerWrapper);

            return container;
        } catch (error) {
            console.error("Error creating category cards:", error);
            throw error;
        }
    }

    static createCategoryCard(category, i) {
        try {
            const card = Helper.createDomElement("li", "category-card");
            if (i >= 3) {
                card.classList.add("hidden");
            }
            card.style.backgroundImage = `url(${category.image})`;
            card.style.backgroundSize = "cover";
            card.style.backgroundPosition = "center";
            card.style.backgroundRepeat = "no-repeat";

            const title = Helper.createDomElement("h3", "category-card_title");
            title.textContent = category.name;

            const buttonContainer = Helper.createDomElement("div", "category-card_button-container");
            const button = ButtonBuilder.createButton(
                "category-card_button--btn",
                "Explore",
                () => {
                    window.location.href = `#intro/category?id=${category.id}`;
                },
                {
                    type: "button"
                }
            );
            buttonContainer.appendChild(button);
            card.appendChild(title);
            card.appendChild(buttonContainer);

            return card;
        } catch (error) {
            console.error("Error creating category card:", error);
            throw error;
        }
    }

    static handleCardsNavigation(direction) {
        const cards = document.querySelectorAll(".category-card");
        const visibleCards = Array.from(cards).filter(card => !card.classList.contains("hidden"));
        const firstVisibleIndex = Array.from(cards).indexOf(visibleCards[0]);
        const lastVisibleIndex = Array.from(cards).indexOf(visibleCards[visibleCards.length - 1]);

        if (direction === "left" && firstVisibleIndex > 0) {
            cards[firstVisibleIndex - 1].classList.remove("hidden");
            cards[lastVisibleIndex].classList.add("hidden");
        } else if (direction === "right" && lastVisibleIndex < cards.length - 1) {
            cards[firstVisibleIndex].classList.add("hidden");
            cards[lastVisibleIndex + 1].classList.remove("hidden");
        }
    }

    static animatedBgBuilder() {
        const bgContainer = Helper.createDomElement("div", "lines");

        for (let i = 0; i < 3; i++) {
            const line = Helper.createDomElement("div", "line");
            bgContainer.appendChild(line);
        }

        return bgContainer;
    }

    static handleRezise() {
        const cardsDom = document.getElementsByClassName("category-card");
        const realScreen = window.innerWidth;

        Array.from(cardsDom).forEach((card, index) => {
            switch (true) {
                case (realScreen < 700):
                    if (index === 0) {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }
                    break;
                case (realScreen >= 700 && realScreen < 1045):
                    if (index === 0 || index === 1) {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }
                    break;
                case (realScreen >= 1045):
                    if (index === 0 || index === 1 || index === 2) {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }
                    break;
            }
        });
    }
}

export { CategoryCardBuilder };
