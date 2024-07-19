import type { RedisClientType } from 'redis'
import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';

interface chir {
  [key: string]: string;
}

const server = Bun.serve({
  port: 2000,
  async fetch(req) {
    const body = await req.body;
    console.log('\r\n--------------\r\nreq.url: ', req.url);
    console.log('\r\n--------------\r\nreq.method: ', req.method);

    const formData = await req.formData();
    let chirObject:chir = {};
    var redisKey = uuidv4().toString();
    chirObject['CHIRID'] = redisKey;

    let client = createClient({ socket: { host: 'redis-server', port: 6379 }, database: 0});
    client.on('error', err => { 
      console.log('Redis Client Error: ', err); 
      return new Response(err);
    });
    await client.connect();
    let redisCounter = client.incr("counter");

    formData.forEach(function(value, key) {
      console.log('key/value: ', key + '/' + value);
      chirObject[key.toString()] = '"' + value.toString() + '"';
    });

    let jsonStr = JSON.stringify(chirObject);

    client.set(redisKey, jsonStr);

    return new Response(JSON.stringify({ key: redisKey, data: jsonStr }), { status: 200 });
  },
});

console.log(`Listening on http://localhost:${server.port}...`);
