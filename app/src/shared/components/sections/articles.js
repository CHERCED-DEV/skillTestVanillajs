import { Helper } from "../../../core/helpers/helper.js";

class ArticlesBuilder {
    static async createArticles(articlesContentConfig) {
        try {
            const articlesConfig = await Helper.fetchContentData(articlesContentConfig);
            if (!articlesConfig) return null;

            const fragment = document.createDocumentFragment();
            articlesConfig.forEach(article => {
                fragment.appendChild(this.createArticleNode(article));
            });

            return fragment;
        } catch (error) {
            console.error("Error creating articles:", error);
            return null;
        }
    }

    static createArticleNode(article) {
        const articleContainer = Helper.createDomElement("div", "article");
        
        const articleImage = Helper.createDomElement("img", "article__image");
        articleImage.src = article.imageUrl;
        articleImage.alt = article.title;
        
        const articleTitle = Helper.createDomElement("h3", "article__title");
        articleTitle.textContent = article.title;
        
        const articleSnippet = Helper.createDomElement("p", "article__snippet");
        articleSnippet.textContent = article.snippet;
        
        const articleLink = Helper.createDomElement("a", "article__link");
        articleLink.href = article.url;
        articleLink.textContent = "Read more";
        
        articleContainer.appendChild(articleImage);
        articleContainer.appendChild(articleTitle);
        articleContainer.appendChild(articleSnippet);
        articleContainer.appendChild(articleLink);

        return articleContainer;
    }
}

export { ArticlesBuilder };
