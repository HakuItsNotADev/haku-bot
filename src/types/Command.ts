import { Client, CommandInteraction } from 'discord.js';

export interface Command {
    name: string;
    description: string;
    run(interaction: CommandInteraction, client: Client): void;
}