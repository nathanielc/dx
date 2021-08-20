import {DB} from '../data/db';

const ws = require('ws');

const UPDATES_TOPIC = 'updates';
interface IPubSub {
    subscribe: (topic: string) => any,
    on: (topic: string, fn: (msg: Uint8Array) => any) => any,
    publish: (topic: string, msg : Uint8Array) => any,
}

export const startWS = async (pubsub: IPubSub, db: DB, port: number) => {
    pubsub.subscribe(UPDATES_TOPIC);
    const server = new ws.Server({port: port});
    console.log('ws listening on', port)
    console.log('events: ', await db.getAllEvents())
    server.on('connection', (socket: any) => {
        console.log('received connection')
        socket.on('message', async (msg: any) =>  {
            console.log('socket msg received', msg);
            pubsub.publish(UPDATES_TOPIC, msg);
            await db.addEvents([JSON.parse(msg)]);
        });
        socket.on('close', () => {
            console.log('socket closed: ', socket);
        });
        pubsub.on(UPDATES_TOPIC, async (msg: any) => {
            console.log('peer msg received');
            await db.addEvents([JSON.parse(msg)]);
            socket.send(msg);
        });
    })
    return server
}
