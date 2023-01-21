import 'dotenv/config';
import { Client } from 'discord.js';

const client = new Client({ intents: [ 7906 ]});
const { TOKEN } = process.env;

client.login(TOKEN);
