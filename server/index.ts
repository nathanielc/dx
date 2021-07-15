import {startPeer} from './peer/index';
//import {runHTTP} from './http/index';
import {startWS} from './ws/index';

const main = async () => {
    const peer = await startPeer();
    const ws = startWS(peer.pubsub);
    ws.on('close', async () => {
        await peer.stop()
        console.log('peer stopped')
    });
}
main()
