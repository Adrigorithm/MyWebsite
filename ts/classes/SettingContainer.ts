import { Locales } from "../enums/Locales.js";

class SettingContainer implements ISettingContainer {
    settings: ISettings;

    constructor() {
        let version = localStorage.getItem("version");

        if (version == null || Number.parseInt(version) != 1)
            this.resetSettings();

        this.settings = {
            locale: localStorage.getItem("locale"),
            theme: localStorage.getItem("theme") ?? (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light")
        };
    }

    resetSettings(): void {
        localStorage.clear();
        localStorage.setItem("version", '1');
    }

    applyLocale(destination: string, urlLocale: string, locale: string): void {
        if (locale == urlLocale)
            return;
            
        location.assign(`/${locale}/${destination}`);
    }

    processUrl(): void {
        if (this.settings.locale == null)
            return;

        let path = location.pathname.substring(1);

        if (path == '') {
            location.assign(`/${this.settings.locale}/index.html`);
            return;
        }

        let localeSepIndex = path.indexOf('/');
        
        this.applyLocale(path.substring(localeSepIndex + 1), path.substring(0, localeSepIndex), this.settings.locale);
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