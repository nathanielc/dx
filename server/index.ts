import {startPeer} from './peer/index';
//import {runHTTP} from './http/index';
import {startWS} from './ws/index';
import {DB} from './data/db';

const main = async () => {
    //start the libp2p peer
    const path = process.argv[2];
    const port = parseInt(process.argv[3]);
    const peer = await startPeer(path + '.peer');
    console.log('replica id', peer.peerId.toB58String());
    const db = new DB(peer.peerId.toB58String(), path + '.db');
    await db.init();
    const ws = await startWS(peer.pubsub, db, port);
    ws.on('close', async () => {
        await peer.stop()
        console.log('peer stopped')
    });
}
main()
