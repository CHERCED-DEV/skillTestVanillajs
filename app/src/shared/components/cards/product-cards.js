import { Helper } from "../../../core/helpers/helper.js";
import { ButtonBuilder } from "../buttons/buttons.js";

class ProductsCardsBuilder {
    static async createProductsCards(productsByCategory) {
        try {
            const container = Helper.createDomElement("div", "products-cards-container");

            productsByCategory.forEach(product => {
                const cardElement = this.createProductCard(product);
                container.appendChild(cardElement);
            });

            return container;
        } catch (error) {
            console.error("Error creating product cards:", error.message || error);
            throw error;
        }
    }

    static createProductCard(product) {
        try {
            const card = Helper.createDomElement("div", "product-card");

            const title = Helper.createDomElement("h3", "product-title");
            title.textContent = product.title;

            const imageBg = Helper.createDomElement("div", "product-image");
            
            let imageUrl = null;
            if (product.images && product.images.length > 0) {
                const imageArray = product.images[0]; // Obtener el primer elemento del array
                if (Array.isArray(imageArray) && imageArray.length === 1) {
                    imageUrl = imageArray[0]; // Tomar la URL de la imagen del primer elemento del array interno
                } else {
                    imageUrl = imageArray; // Si no es un array o tiene más de un elemento, usar la cadena directamente
                }
            }
            if (imageUrl) {
                imageBg.style.backgroundImage = `url(${imageUrl})`;
            } else {
                imageBg.style.backgroundImage = `url('https://via.placeholder.com/300')`; // Placeholder image if no image available
            }
            imageBg.style.backgroundSize = "cover";
            imageBg.style.backgroundPosition = "center";
            imageBg.style.backgroundRepeat = "no-repeat";

            const price = Helper.createDomElement("p", "product-price");
            price.textContent = `Price: $${product.price}`;

            const description = Helper.createDomElement("p", "product-description");
            description.textContent = product.description;

            const button = ButtonBuilder.createButton(
                "category-button",
                "Comprar", // Cambio de texto a "Comprar"
                () => {
                    // Aquí deberías definir la lógica para comprar el producto, por ejemplo:
                    alert(`¡Compraste ${product.title}!`);
                },
                {
                    type: "button"
                }
            );

            card.appendChild(title);
            card.appendChild(imageBg);
            card.appendChild(price);
            card.appendChild(description);
            card.appendChild(button);

            return card;
        } catch (error) {
            console.error("Error creating product card:", error.message || error);
            throw error;
        }
    }
}

export { ProductsCardsBuilder };
