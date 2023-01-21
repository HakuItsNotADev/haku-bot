import { Client } from 'discord.js';

export interface Event {
    trigger: string;
    run(args: any, client: Client): void;
}