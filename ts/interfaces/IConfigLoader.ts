interface IConfigLoader {
    settings: Map<String, String>;

    init(): void;
    localeRedirect(): void;
    loadSettings(): void;
}