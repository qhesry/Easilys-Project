import WebSocket, { WebSocketServer } from 'ws';
const port = 3000;
export const wss = new WebSocketServer({ port: port });

/* Utils functions to broadcast message to everyone including or excluding self if necessary. */
export function broadcastMessageIncludingSelf(message) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

export function broadcastMessageExcludingSelf(ws, message) {
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}