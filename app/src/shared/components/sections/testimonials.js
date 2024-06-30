import { Helper } from "../../../core/helpers/helper.js";

class TestimonialsBuilder {
    static async createTestimonials(testimonialContentConfig) {
        try {
            const testimonialsConfig = await Helper.fetchContentData(testimonialContentConfig);
            if (!testimonialsConfig) return null;

            const fragment = document.createDocumentFragment();
            testimonialsConfig.forEach(testimonial => {
                fragment.appendChild(this.createTestimonialNode(testimonial));
            });

            return fragment;
        } catch (error) {
            console.error("Error creating testimonials:", error);
            return null;
        }
    }

    static createTestimonialNode(testimonial) {
        const testimonialContainer = Helper.createDomElement("div", "testimonial");
        
        const testimonialText = Helper.createDomElement("p", "testimonial__text");
        testimonialText.textContent = testimonial.text;
        
        const testimonialAuthor = Helper.createDomElement("p", "testimonial__author");
        testimonialAuthor.textContent = `- ${testimonial.author}`;
        
        testimonialContainer.appendChild(testimonialText);
        testimonialContainer.appendChild(testimonialAuthor);

        return testimonialContainer;
    }
}

export { TestimonialsBuilder };