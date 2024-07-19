from flask import Flask
from redis import Redis, RedisError
import os
import socket
import datetime
redis = Redis(host="redis-server", db=0, socket_connect_timeout=2, socket_timeout=2)
pipeline = redis.pipeline()

app = Flask(__name__)
@app.route("/")
def main():
    data = ""
    num_keys=""
    counter = 0
    try:
        ldata = ""
        redisCounter = redis.get("counter")
        counter=str(repr(redisCounter))
        keys = sorted(redis.keys("*"), reverse=True)
        nkeys = len(keys)
        num_keys=nkeys
      
        for k in keys:
            pipeline.get(k)
            ldata = ldata + \
                    "<b>Key:</b> {k}<br/> <b>Data:</b> {data}<br/><br/>\n" \
                        .format(k=k, data=pipeline.execute())
        data = ldata
    except RedisError:
        visits = "<i>cannot connect to Redis server to count</i>"
    html = "<h3>Redis Query</h3>\n" \
            "<b>Hostname:</b> {hostname}<br/>\n" \
            "<b># of Keys:</b> {num_keys}<br/><br/>\n" \
            "<b>Counter:</b> {counter}<br/><br/>\n" \
            "{data}".format(hostname=socket.gethostname(), num_keys=num_keys, data=data, counter=counter)

    return html
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)