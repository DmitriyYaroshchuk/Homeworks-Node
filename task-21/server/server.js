const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// const server = http.createServer((req, res) => {
//     console.log(`Method: ${req.method}, URL: ${req.url}`);
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello everyone from Node.js server.');
// });

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(`<h1>Main</h1>`);
//     } else if (req.url === '/json') {
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         res.end(JSON.stringify({ message: 'Hello, JSON !' }));
//     } else {
//         res.writeHead(404, {'Content-Type': 'text/plain'});
//         res.end('Page is not found');
//     }
// });

// const server = http.createServer((req, res) => {
//     const parsedUrl = url.parse(req.url, true);
//
//     if (req.method === 'GET') {
//         const queryParams = parsedUrl.query;
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify(queryParams));
//     }
//
//     else if (req.method === 'POST') {
//         let body = '';
//         req.on('data', (chunk) => {
//             body += chunk.toString();
//         });
//         req.on('end', () => {
//             res.writeHead(200, {'Content-Type': 'application/json'});
//             res.end(`Data obtained: ${body}`);
//         });
//     }
// });


const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/' : {
            const filePath = path.join(__dirname, '../', 'index.html');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('404 Not Found');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                }
            })
            break;
        }
        case '/about' : {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page');
            break;
        }
        case '/contact' : {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Contacts');
            break;
        }
        default: {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page is not found');
            break;
        }
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});