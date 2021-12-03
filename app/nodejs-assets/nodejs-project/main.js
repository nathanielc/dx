const toString = require('uint8arrays').toString;

let rn_bridge;
const mode = process.argv[2];
// Mock out the react native bridge when running on the host
if (mode == 'host') {
    rn_bridge = {
        channel: {
            on: (m, f) => {
                console.log('stubbed rn-bridge');
            },
        },
        app: {
            datadir: () => './tmp/dx.app'
        }
    }
} else {
    rn_bridge = require('rn-bridge');
}

const peer = require('./peer');

const dbPath = rn_bridge.app.datadir() + '/peer.db';

const topic = 'tableID';

const main = async () => {
    const p = await peer.startPeer(dbPath);
    console.log('peer started', p.peerId.toB58String());
    p.pubsub.on(topic, (msg) => {
        // Send messages received from peers to React-Native.
        console.log("recv: peer, send: rn", msg);
        // Decode byte array and send as utf-8 string
        rn_bridge.channel.send(toString(msg.data));
    });
    p.pubsub.subscribe(topic)
    rn_bridge.channel.on('message', (msg) => {
        // Send messages from React-Native to all peers.
        console.log("recv: rn, send: peer", msg);
        p.pubsub.publish(topic, msg);
    });
    if (mode == 'host') {
        //TODO Hack out some edits to add new spells and such
        setInterval(() => {
            p.pubsub.publish(topic, '{"localEventID":"local-id","globalEventID":"global-id","modelType":"spells","modelID":"","data":{"name":"super","school":"duper"}}')
            //const enc = new encoding.TextEncoder();
            //p.pubsub.publish(topic, enc.encode('{"localEventID":"local-id","globalEventID":"global-id","modelType":"spells","modelID":"","data":{"name":"super","school":"duper"}}'));
        }, 2000)
    }
}

main()
    .then(() => console.log('main finished'))
    .catch((e) => console.log('main failed', e));
