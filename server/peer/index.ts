const Libp2p = require('libp2p');
const TCP = require('libp2p-tcp');
const { NOISE } = require('libp2p-noise');
const MPLEX = require('libp2p-mplex');
const Gossipsub = require('libp2p-gossipsub')
const PeerId = require('peer-id');
const Mdns = require('libp2p-mdns')
const fs = require('fs/promises');

const multiaddr = require('multiaddr');

const file = 'package.json';

export const startPeer = async (path: string) => {
    let peerId : any = null;
    try {
        const data = await fs.readFile(path);
        console.log('existing peer ID found');
        peerId = await PeerId.createFromProtobuf(data);
    } catch {
        console.log('no existing peer ID found, creating new peer ID');
        peerId = await PeerId.create();
        await fs.writeFile(path, peerId.marshal())
    }
    const node = await Libp2p.create({
        peerId,
        addresses: {
            // add a listen address (localhost) to accept TCP connections on a random port
            listen: ['/ip4/127.0.0.1/tcp/0']
        },
        modules: {
            transport: [TCP],
            connEncryption: [NOISE],
            streamMuxer: [MPLEX],
            pubsub: Gossipsub,
            peerDiscovery: [Mdns],
        }
    })

    // start libp2p
    await node.start()
    console.log('libp2p has started')

    // print out listening addresses
    console.log('listening on addresses:')
    node.multiaddrs.forEach((addr:any) => {
        console.log(`${addr.toString()}/p2p/${node.peerId.toB58String()}`)
    })
    node.on('peer:discovery', (otherID:any) => {
        console.log(peerId.toB58String(), "discovered:", otherID.toB58String());
    })

    return node;
}
