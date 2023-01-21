import fG from 'fast-glob';
import { Client } from 'discord.js';
import { Event } from '../../types/Event';

async function getEvents (): Promise<Event[]> {
    var eventsPropsArr: Event[] = [];

    await fG('src/handlers/event-handler/events/**/**.ts')
        .then((events) => {
            console.log(events)

            events.forEach(async (event) => {
                ;(await import(`../../../${event}`)
                    .then((props: Event) => {
                        eventsPropsArr.push(props);
                    }))
            }) 
        });

    return eventsPropsArr;
}

async function runEachEvent (client: Client) {
    await getEvents()
        .then((events: Event[]) => {
            events.forEach((event) => {
                client.on(`${event.trigger}`, (args: any) => event.run(args, client))
            })
        });
}

export
    default
        async function eventHandler (client: Client) {
            await runEachEvent(client);
        }
            