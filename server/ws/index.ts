const ws = require('ws');

const UPDATES_TOPIC = 'updates';
interface IPubSub {
    subscribe: (topic: string) => any,
    on: (topic: string, fn: (msg: Uint8Array) => any) => any,
    publish: (topic: string, msg : Uint8Array) => any,
}

export const startWS = (pubsub: IPubSub) => {
    pubsub.subscribe(UPDATES_TOPIC);
    const server = new ws.Server({port:8888});
    console.log('ws listening on 8888')
    server.on('connection', (socket: any) => {
        console.log('received connection')
        socket.on('message', (msg: any) =>  {
            console.log('socket msg received', msg);
            pubsub.publish(UPDATES_TOPIC, msg);
        });
        socket.on('close', () => {
            console.log('socket closed: ', socket);
        });
        pubsub.on(UPDATES_TOPIC, (msg: any) => {
            console.log('peer msg received');
            socket.send(msg);
        });
    })
    return server
}
