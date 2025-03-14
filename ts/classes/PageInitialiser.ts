import { Locales } from "../enums/Locales.js";
import { Themes } from "../enums/Themes.js";

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
            
        location.assign(`/${locale}/${destination}`);
    }

    processUrl(): void {
        let path = location.pathname.substring(1);
        let localeSepIndex = path.indexOf('/');
        
        this.applyLocale(path.substring(localeSepIndex + 1), path.substring(0, localeSepIndex), this.settings.locale as string);
    }
}

export { PageInitialiser }