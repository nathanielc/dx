import { ChangeSet } from '../models/changes';

let levelup = require('levelup');
let leveldown = require('leveldown');

let db = levelup(leveldown('./lvl.db'));
// Allow 2^32 changes per timestamp resolution
let counter = 0;
const MAX_COUNTER = 2^32-1;

const generateKey = (timestamp:number) => {
    return timestamp.toString().padStart(20,'0') + '#' + counter.toString(16).padStart(2,'0');
}
const generateKeyPrefix = (timestamp:number) => {
    return timestamp.toString().padStart(20,'0') + '#00'
}

export const addChanges = async (changes: any) => {
    counter++;
    if (counter > MAX_COUNTER) {
        counter = 0;
    }
    const key = generateKey(changes.timestamp);
    await db.put(key, JSON.stringify(changes), (err: any) => {
      if (err) return console.log('error writing to db:', err);
    });
}
export const getChanges = async (timestamp: number) => {
    let data :ChangeSet[] = [];
    const readable = db.createValueStream({gt: generateKeyPrefix(timestamp)});
    for await( const value of  readable) {
        data.push(JSON.parse(value));
    }
    return data
}
