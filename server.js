const http = require('http');
const fs = require('fs');
const path = require('path');

const arquivo = path.join(__dirname, 'public', 'index.html');
const servidor = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(arquivo, (erro, conteudo) => {
      if (erro) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Não foi possível carregar a aplicação.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(conteudo);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Página não encontrada.');
});

servidor.listen(5173, '127.0.0.1', () => {
  console.log('Aplicação disponível em http://127.0.0.1:5173');
});
