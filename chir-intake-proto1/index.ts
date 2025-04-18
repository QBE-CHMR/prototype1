
interface chir {
  [key: string]: string;
}

const server = Bun.serve({
  port: process.env.LISTEN_PORT,
  async fetch(req) {
    const url = new URL(req.url);
    console.log('req.method: ', req.method)
    let jsonStr = JSON.stringify(req.json);

        // return index.html for root path
    if (url.pathname === "/")
      return new Response(Bun.file("src/static/index.html"), {
        headers: {
          "Content-Type": "text/html",
        },
      });

    // parse formdata at /action
    if (url.pathname === '/action') {
      console.log('URL Pathname = action');
      const formdata = await req.formData();
      let chirObject:chir = {};

      const body = new FormData();
      formdata.forEach(function(value, key) {
        console.log('key/value: ', key + '/' + value);
        chirObject[key.toString()] = '"' + value.toString() + '"';
        body.set(key.toString(), value.toString())
    });
    jsonStr = JSON.stringify(chirObject);

    // send to dal
    const response = await fetch('dal:2000/api/chir/create', {
      method: 'POST',
      body
    });

    console.log('response = ', response);

    const respJSON = await response.json(); 
    const respJsonStr = JSON.stringify(respJSON);
      
    console.log('response.json(): ' + respJsonStr);
    console.log('Response status = ', response.status, response.statusText);
    return new Response(respJsonStr);
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port}...`)
