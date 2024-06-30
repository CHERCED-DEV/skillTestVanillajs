import { Helper } from "../../../core/helpers/helper.js";

class FooterBuilder {
    static async createFooter() {
        try {
            const footerContent = await Helper.fetchContentData('footerContent.json');
            if (!footerContent) return null;

            const fragment = document.createDocumentFragment();
            const footerBody = Helper.createDomElement("div", "footer__body");

            footerBody.appendChild(FooterBuilder.createNewsletterSection(footerContent.newsletter));
            footerBody.appendChild(FooterBuilder.createLinksSection(footerContent.links));
            footerBody.appendChild(FooterBuilder.createAboutSection(footerContent.about));
            fragment.appendChild(footerBody);
            fragment.appendChild(FooterBuilder.createCompanyInfoSection(footerContent.companyInfo));

            const footerWrapper = Helper.createDomElement("div", "footer__wrapper");
            footerWrapper.appendChild(fragment);

            return footerWrapper;
            
        } catch (error) {
            console.error("Error creating footer:", error);
            return null;
        }
    }

    static createNewsletterSection(newsletterData) {
        const newsletterSection = Helper.createDomElement("section", "footer__newsletter");

        const title = Helper.createDomElement("h3", "footer__section-title");
        title.textContent = newsletterData.title;

        const form = Helper.createDomElement("form",'footer__form');
        form.id = newsletterData.formId;

        const emailInput = Helper.createDomElement("input", "footer__input", {
            type: "email",
            placeholder: newsletterData.inputPlaceholder
        });

        const submitButton = Helper.createDomElement("button", "footer__submit");
        submitButton.type = "submit";
        submitButton.textContent = newsletterData.buttonText;

        form.appendChild(emailInput);
        form.appendChild(submitButton);

        newsletterSection.appendChild(title);
        newsletterSection.appendChild(form);

        return newsletterSection;
    }

    static createAboutSection(aboutData) {
        const aboutSection = Helper.createDomElement("section", "footer__about");

        const title = Helper.createDomElement("h3", "footer__section-title");
        title.textContent = aboutData.title;

        const description = Helper.createDomElement("p", "footer__about-description");
        description.textContent = aboutData.description;

        aboutSection.appendChild(title);
        aboutSection.appendChild(description);

        return aboutSection;
    }

    static createLinksSection(linksData) {
        const linksSection = Helper.createDomElement("section", "footer__links");

        const title = Helper.createDomElement("h3", "footer__section-title");
        title.textContent = "Follow me";

        const ul = Helper.createDomElement("ul", 'footer__link-list');

        linksData.forEach(link => {
            const li = Helper.createDomElement("li", 'footer__link-item');
            const a = Helper.createDomElement("a", 'footer__link');
            a.href = link.url;
            a.textContent = link.name;
            if (link.target) {
                a.target = "_blank";
            }

            li.appendChild(a);
            ul.appendChild(li);
        });

        linksSection.appendChild(title);
        linksSection.appendChild(ul);

        return linksSection;
    }

    static createCompanyInfoSection(companyInfoData) {
        const companyInfoSection = Helper.createDomElement("section", "footer__company-info");

        const name = Helper.createDomElement("p", "footer__company-name");
        name.textContent = companyInfoData.name;

        const year = Helper.createDomElement("p", "footer__company-year");
        year.textContent = `© ${companyInfoData.year}`;

        companyInfoSection.appendChild(name);
        companyInfoSection.appendChild(year);

        return companyInfoSection;
    }
}

export { FooterBuilder };
