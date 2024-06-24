import { Helper } from "../../../core/helpers/helper.js";

class FooterBuilder {
    static async createFooter() {
        try {
            const footerContent = await Helper.fetchContentData('footerContent.json');
            if (!footerContent) return null;

            const fragment = document.createDocumentFragment();

            fragment.appendChild(FooterBuilder.createNewsletterSection(footerContent.newsletter));
            fragment.appendChild(FooterBuilder.createAboutSection(footerContent.about));
            fragment.appendChild(FooterBuilder.createCompanyInfoSection(footerContent.companyInfo));

            return fragment;
        } catch (error) {
            console.error("Error creating footer:", error);
            return null;
        }
    }

    static createNewsletterSection(newsletterData) {
        const newsletterSection = Helper.createDomElement("section", "footer-newsletter");

        const title = Helper.createDomElement("h3", "footer-section-title");
        title.textContent = newsletterData.title;

        const form = document.createElement("form");
        form.id = newsletterData.formId;

        const emailInput = Helper.createDomElement("input", "newsletter-input", {
            type: "email",
            placeholder: newsletterData.inputPlaceholder
        });

        const submitButton = Helper.createDomElement("button", "newsletter-submit");
        submitButton.type = "submit";
        submitButton.textContent = newsletterData.buttonText;

        form.appendChild(emailInput);
        form.appendChild(submitButton);

        newsletterSection.appendChild(title);
        newsletterSection.appendChild(form);

        return newsletterSection;
    }

    static createAboutSection(aboutData) {
        const aboutSection = Helper.createDomElement("section", "footer-about");

        const title = Helper.createDomElement("h3", "footer-section-title");
        title.textContent = aboutData.title;

        const description = Helper.createDomElement("p", "footer-about-description");
        description.textContent = aboutData.description;

        aboutSection.appendChild(title);
        aboutSection.appendChild(description);

        return aboutSection;
    }

    static createCompanyInfoSection(companyInfoData) {
        const companyInfoSection = Helper.createDomElement("section", "footer-company-info");

        const name = Helper.createDomElement("p", "footer-company-name");
        name.textContent = companyInfoData.name;

        const year = Helper.createDomElement("p", "footer-company-year");
        year.textContent = `© ${companyInfoData.year}`;

        companyInfoSection.appendChild(name);
        companyInfoSection.appendChild(year);

        return companyInfoSection;
    }
}

export { FooterBuilder };
