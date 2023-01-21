import { CommandInteraction } from 'discord.js';

module.exports = {
    name: 'ping',
    description: 'pinga.',
    run: (interaction: CommandInteraction) => {
        interaction.reply('Pong.');
    }
}