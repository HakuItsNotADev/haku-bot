import { Client, CommandInteraction } from "discord.js";
import commandHandler from "../../command-handler/commandHandler";

module.exports = {
    trigger: 'interactionCreate',
    run: async (interaction: CommandInteraction, client: Client) => {
        await commandHandler(interaction, client)
    }
}