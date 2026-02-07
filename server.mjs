import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5173;
const ROOT = __dirname;

const MIME = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".map": "application/json"
};

const server = http.createServer((req, res) => {
    const urlPath = req.url === "/" ? "/index.html" : req.url;
    const filePath = path.join(ROOT, urlPath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Not found");
            return;
        }

        const ext = path.extname(filePath);
        res.writeHead(200, {
            "Content-Type": MIME[ext] ?? "application/octet-stream"
        });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
