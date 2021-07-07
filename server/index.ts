import {runPeer} from './peer/index';
import {runHTTP} from './http/index';

const main = async () => {
    await Promise.all([runPeer(), runHTTP()]);
}
main()
