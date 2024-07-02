class LoaderManagerService {
    static firstLoad = true;

    static showLoader() {
        const loader = document.getElementById('loader');
        const pageWrapper = document.getElementById('pageWrapper');
        if (this.firstLoad) {
            if (loader) {
                loader.style.opacity = '1';
                pageWrapper.classList.remove('loaded');
                this.firstLoad = false;
            }
        } else {
            loader.style.opacity = '1';
            loader.style.display = 'flex';
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

    static async handleLoader(promise) {
        this.showLoader();
        try {
            return await promise;
        } finally {
            await this.hideLoaderWithDelay();
        }
    }

    static async hideLoaderWithDelay() {
        await wait(1500);
        this.hideLoader();
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { LoaderManagerService };
