import { Helper } from "../helpers/helper.js";

class ProductService {
    constructor(apiUrl,headers) {
        this.apiUrl = apiUrl;
        this.headers = headers;
    }

    async fetchProducts() {
        return await Helper.fetchApi(this.apiUrl + '/products', this.headers, 'Error fetching products:');
    }

    async fetchProductById(productId) {
        return await Helper.fetchApi(`${this.apiUrl}/products/${productId}`, this.headers, `Error fetching product with id ${productId}:`);
    }

    async fetchProductsByCategory(category) {
        return await Helper.fetchApi(`${this.apiUrl}/categories/${category}/products`, this.headers, `Error fetching products for category ${category}:`);
    }

    async fetchAllCategories() {
        return await Helper.fetchApi(`${this.apiUrl}/categories`, this.headers, `Error fetching categories:`);
    }
}

export { ProductService }