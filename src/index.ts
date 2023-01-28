import 'dotenv/config';
import { Client } from 'discord.js';
import eventHandler from './handlers/event-handler/eventHandler';

const client = new Client({ intents: [ 32509  ]  });
const { TOKEN } = process.env;

(async () => {
    eventHandler(client);
})();

client.login(TOKEN);
