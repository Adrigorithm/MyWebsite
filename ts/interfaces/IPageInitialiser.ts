interface IPageInitialiser {
    settings: ISetting;

    applyLocale(destination: string, urlLocale: string, locale: string): void;
    processUrl(): void;
}