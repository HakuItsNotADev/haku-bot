import { Client } from "discord.js";

module.exports = {
    trigger: 'ready',
    run: (client: Client) => {
        var botUsername = client.user?.username;
        
        console.log(`Logged on ${botUsername}`);
    }
}