import { Locales } from "../enums/Locales.js";

class SettingContainer implements ISettingContainer {
    settings: ISettings;

    constructor() {
        this.settings = {
            locale: localStorage.getItem("locale") ?? Locales.English,
            theme: localStorage.getItem("theme") ?? (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"),
            firstVisit: localStorage.getItem("firstVisit") 
                ? false
                : true  
        };
    }

    applyLocale(destination: string, urlLocale: string, locale: string): void {
        if (locale == urlLocale)
            return;
            
        location.assign(`/${locale}/${destination}`);
    }

    processUrl(): void {
        if (this.settings.firstVisit) {
            this.initialSetup();
            return;
        }

        let path = location.pathname.substring(1);
        let localeSepIndex = path.indexOf('/');
        
        this.applyLocale(path.substring(localeSepIndex + 1), path.substring(0, localeSepIndex), this.settings.locale as string);
    }

    initialSetup(): void {
        localStorage.setItem("firstVisit", '0');
        location.assign("/en-GB/pages/settings.html");
    }

    initSettingsMenu(localeElements: HTMLDivElement[], themeElements: HTMLDivElement[]): void {
        localeElements.forEach(localeElement => {
            if (this.settings.locale == localeElement.querySelector(".settingValue")!.textContent as string)
                this.styleActiveElemenet(localeElement);

            localeElement.addEventListener("click", () => {
                let value = localeElement.querySelector(".settingValue")!.textContent as string;
                
                if (this.settings.locale == value)
                    return;

                this.settings.locale = value;

                localStorage.setItem("locale", this.settings.locale);
                location.reload();
            })
        })

        themeElements.forEach(themeElement => {
            if (this.settings.theme == themeElement.querySelector(".settingValue")!.textContent as string)
                this.styleActiveElemenet(themeElement);

            themeElement.addEventListener("click", () => {
                let value = themeElement.querySelector(".settingValue")!.textContent as string;
                
                if (this.settings.theme == value)
                    return;
                
                this.settings.theme = value;

                localStorage.setItem("theme", this.settings.theme);
                location.reload();
            })
        })
    }

    styleActiveElemenet(element: HTMLDivElement): void {
        element.classList.remove("border-transparent");
        element.classList.add("border-dark-moss-green", "dark:border-burnt-umber", "sunset:border-orange-web")
    }
}

export { SettingContainer }