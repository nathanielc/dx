const Libp2p = require('libp2p');
const TCP = require('libp2p-tcp');
const { NOISE } = require('libp2p-noise');
const MPLEX = require('libp2p-mplex');
const MDNS = require('libp2p-mdns')
const FLOODSUB = require('libp2p-floodsub')
const PeerId = require('peer-id');
const fs = require('fs').promises;

const startPeer = async (path) => {
    let peerId = null;
    try {
        const data = await fs.readFile(path);
        peerId = await PeerId.createFromProtobuf(data);
        console.log('existing peer ID found', peerId.toB58String());
    } catch {
        peerId = await PeerId.create({ keyType: 'Ed25519' });
        console.log('no existing peer ID found, creating new peer ID', peerId.toB58String());
        await fs.writeFile(path, peerId.marshal())
    }
    const node = await Libp2p.create({
        peerId,
        addresses: {
            // add a listen address (localhost) to accept TCP connections on a random port
            listen: ['/ip4/0.0.0.0/tcp/0']
        },
        modules: {
            transport: [TCP],
            connEncryption: [NOISE],
            streamMuxer: [MPLEX],
            peerDiscovery: [MDNS],
            pubsub: FLOODSUB,
        }
    })

    // start libp2p
    await node.start()

    // print out listening addresses
    console.log('listening on addresses:')
    node.multiaddrs.forEach((addr) => {
        console.log(`${addr.toString()}/p2p/${node.peerId.toB58String()}`)
    })
    node.on('peer:discovery', (otherID) => {
        console.log(peerId.toB58String(), "discovered:", otherID.toB58String());
    })

    return node;
}

module.exports = { startPeer: startPeer };
