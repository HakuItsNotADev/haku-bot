import { Client } from 'discord.js';
import fG from 'fast-glob';
import { Event } from '../../types/Event'

async function getEvents () {
    const dir = 'src/handlers/event-handler/events/**/**.ts';
    let eventsPropsArr: Event[] = [];

    await fG(dir)
        .then(async (events) => {
            events.forEach(async (event) => {
                const props = await import(`../../../${event}`)

                eventsPropsArr.push(props);
            })
        })
    
    return eventsPropsArr;
}

async function runEachEvent (client: Client) {
    const events = await getEvents();

    events.forEach((event) => {
        client.on(`${event.trigger}`, (args: any) => event.run(args, client))
    })
}

export
    default
        async function eventHandler (client: Client) {
            await runEachEvent(client);
        }
            