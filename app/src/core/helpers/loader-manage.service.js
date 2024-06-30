class LoaderManagerService {
    static showLoader() {
        const loader = document.getElementById('loader');
        const pageWrapper = document.getElementById('pageWrapper');
        if (loader) {
            loader.style.opacity = '1';
            pageWrapper.classList.remove('loaded');
        }
    }

    static hideLoader() {
        const loader = document.getElementById('loader');
        const pageWrapper = document.getElementById('pageWrapper');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.display = 'none';
                pageWrapper.classList.add('loaded');
            }, 3500);
        }
    }

    static handleLoader(promise) {
        this.showLoader();
        return promise.finally(() => {
            this.hideLoader();
        });
    }
}

export { LoaderManagerService };
