class ConfigLoader implements IConfigLoader {
    settings: Map<String, String>;

    init(): void {
        this.loadSettings();
        this.localeRedirect();

    }

    localeRedirect(): void {
        let path: string[] = location.pathname.split('/');
        let pathLocale: string = path[1];

        if (pathLocale == '') {
            location.assign(`/${this.settings.get("locale")}`)

            return;
        }
    }

    loadSettings(): void {
        this.settings.set("locale", localStorage.getItem("locale") ?? Locales.English);
    }
    
}