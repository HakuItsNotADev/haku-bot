import fG from 'fast-glob';
import { Command } from '../types/Command';

export
    default
        async function getCommands (dir: string) {
            var commandsPropsArr: Command[] = [];
            
            await fG(dir)
                .then((commands) => {
                    commands.forEach(async (command) => {
                        await import(`../../${command}`)
                            .then((props: Command) => {
                                commandsPropsArr.push(props);
                            })
                    })
                });
            
            return commandsPropsArr;
        }