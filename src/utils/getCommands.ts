import fG from 'fast-glob';
import { Command } from '../types/Command';

export
    default
        async function getEvents () {
            const dir = 'src/handlers/command-handler/commands/**/**.ts';
            let commandsPropsArr: Command[] = [];
        
            await fG(dir)
                .then(async (commands) => {
                    commands.forEach(async (cmd) => {
                        const props = await import(`../../${cmd}`)
        
                        commandsPropsArr.push(props);
                    })
                })
            
            return commandsPropsArr;
        }