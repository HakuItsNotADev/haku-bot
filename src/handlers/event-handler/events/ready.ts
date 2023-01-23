import { Client } from 'discord.js';
import { Command } from '../../../types/Command';
import getCommands from '../../../utils/getCommands';

function checkIfExistsInAppCommands (client: Client, cmd: Command) {
    const cmds = client.application?.commands;

    const existsInCmds = cmds?.cache
        .some(cmdInCache => cmdInCache.name === cmd.name);

    if (existsInCmds) {
        return;
    } else {
        return client.application
            ?.commands.create(
                {
                    name: cmd.name,
                    description: cmd.description
                }
            ).then(() => {
                console.log('Added command:', cmd)
            });
    }
}

module.exports = {
    trigger: 'ready',
    run: async (client: Client) => {
        const botUsername = client.user?.username;

        await getCommands()
            .then((commands: Command[]) => {
                commands.forEach(async (cmd: Command) => {
                    await checkIfExistsInAppCommands(client, cmd)
                })
            })

        console.log(`Logged on ${botUsername}`);
    }
}