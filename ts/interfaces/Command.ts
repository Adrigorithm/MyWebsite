interface Command {
    name: string;
    synopsis: string;
    description: string;
    help: string | undefined;

    options: Array<CommandOption> | undefined;
    params: Array<CommandParam> | undefined;
    examples: Array<CommandExample> | undefined;
}