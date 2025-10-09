const http = require('http');
const { readFile } = require('fs/promises');
const url = require("node:url");




const srv = http.createServer(async(req, res) => {
    const pathname = url.parse(req.url, true);


    switch (true) {
        case pathname.pathname === '/':
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Strona główna')
            break
        case pathname.pathname === '/json':
            const json = {Month: "December", Day: "1st"};
            res.end(JSON.stringify(json));
            break
        case pathname.pathname === '/in':
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h2>Strona in</h2>')
            break
        case pathname.pathname === '/file':
            const file = await readFile('plik.html', 'utf8')
            res.end(file.toString())
            break
        case pathname.pathname === '/get_params':
            const params = pathname.query
            const time = new Date().getTime();
            jsonFile.writeFile('params_'+time+'.json', params);

            console.log(params);
            console.log(time);
            res.end(JSON.stringify({ok:"ok"}, null, 2));
            break
        default:

            const file2 = readFile("assets"+pathname.pathname, 'utf8')
            res.end(file2.toString())
            res.end(404,'Error: Not Found!')
    }

}).listen(8080);