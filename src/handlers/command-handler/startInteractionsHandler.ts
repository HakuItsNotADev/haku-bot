import { ApplicationCommandOptionType, Client } from 'discord.js';
import { Command } from '../../types/Command';
import getCommands from '../../utils/getCommands';

function checkIfExistsInAppCommands (client: Client, cmd: Command) {
    const cmds = client.application?.commands;

    const existsInCmds = cmds?.cache
        .some(cmdInCache => cmdInCache.name === cmd.name);

    const cmdObject = () => {
        const baseObj = {
            name: cmd.name,
            description: cmd.description
        }

        if (cmd.options) {
            const options = cmd.options;
            const updatedObject = {
                ...baseObj,
                options
            }

            return updatedObject;
        }

        return baseObj;
    }

    if (existsInCmds) {
        return;
    } else {
        return client.application
            ?.commands.create(
                cmdObject()
            ).then(() => {
                console.log('Added command:', cmd)
            });
    }
}

export 
    default 
        async function startInteractionsHandler (client: Client) {
            await getCommands()
                .then((commands: Command[]) => {
                    commands.forEach(async (cmd: Command) => {
                        await checkIfExistsInAppCommands(client, cmd)
                    })
                })
        }
