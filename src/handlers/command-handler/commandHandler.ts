import { Client, CommandInteraction } from 'discord.js';
import { Command } from '../../types/Command';
import getCommands from '../../utils/getCommands';

async function runIfEvoked (cmdsArr: Command[], interaction: CommandInteraction, client: Client) {
    cmdsArr.forEach(async (cmd) => {
        if (interaction.commandName === cmd.name) {
            cmd.run(interaction, client)
        }
    })
}

export 
    default 
        async function commandHandler (interaction: CommandInteraction, client: Client) {
            const cmdsArr = await getCommands('src/handlers/command-handler/commands/**/**.ts');

            await runIfEvoked(cmdsArr, interaction, client);
        }