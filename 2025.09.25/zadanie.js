let http = require('http');
const { readFile } = require('fs/promises');

const srv = http.createServer(async(req, res) => {
    const pathname = req.url


    switch (true) {
        case pathname === '/':
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Strona główna')
            break
        case pathname === '/json':
            const json = {Month: "December", Day: "1st"};
            res.write(JSON.stringify(json));
            break
        case pathname === '/in':
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h2>Strona in</h2>')
            break
        case pathname === '/file':
            const file = await readFile('plik.html', 'utf8')
            res.end(file.toString())
            break

        default:
            res.status = 404
            res.end('Error: Not Found!')
    }

}).listen(8080);