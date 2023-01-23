import { Client } from 'discord.js';
import startInteractionsHandler from '../../command-handler/startInteractionsHandler';

module.exports = {
    trigger: 'ready',
    run: async (client: Client) => {
        const botUsername = client.user?.username;

        startInteractionsHandler(client);

        console.log(`Logged on ${botUsername}`);
    }
}