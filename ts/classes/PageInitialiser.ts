class PageInitialiser implements IPageInitialiser {
    settings: ISetting;

    constructor() {
        this.settings = {
            locale: localStorage.getItem("locale") ?? Locales.English,
            theme: localStorage.getItem("theme") ?? Themes.Light
        };
    }

    applyLocale(destination: string, urlLocale: string, locale: string): void {
        if (locale == urlLocale)
            return;

        if (locale == Locales.English) {
            location.assign(`/${destination}`);

            return;
        }
            
        location.assign(`${locale}/${destination}`);
    }

    processUrl(): void {
        let path = location.pathname;

        if (path == '/' || path == "/index.html") {
            this.applyLocale('index.html', Locales.English, this.settings.locale);

            return;
        }

        path = path.substring(1);
        let localeSepIndex = path.indexOf('/');
        
        this.applyLocale(path.substring(localeSepIndex + 1), path.substring(0, localeSepIndex), this.settings.locale as string);
    }
}

export { PageInitialiser }