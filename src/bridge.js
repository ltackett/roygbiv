import lsbridge from 'lsbridge';

let Bridge = null;

export function createPubsub(namespace) {
    return {
        send: msg => Bridge.send(namespace, msg),
        subscribe: cb => Bridge.subscribe(namespace, cb),
        unsubscribe: () => Bridge.unsubscribe(namespace)
    };
}

export function startBridge() {
    Bridge = lsbridge;
}