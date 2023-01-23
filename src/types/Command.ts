import { Client, CommandInteraction } from 'discord.js';

interface Options {
    name: string;
    description: string;
    type: number;
    required: boolean;
}

export interface Command {
    name: string;
    description: string;
    options?: Options;
    run(interaction: CommandInteraction, client: Client): void;
}