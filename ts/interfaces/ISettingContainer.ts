interface ISettingContainer {
    settings: ISettings;

    applyLocale(destination: string, urlLocale: string, locale: string): void;
    processUrl(): void;
    initSettingsMenu(localeElements: HTMLDivElement[], themeElements: HTMLDivElement[]): void;
    styleActiveElemenet(element: HTMLDivElement): void;

}