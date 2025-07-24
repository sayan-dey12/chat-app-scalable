import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { pub, sub } from './redis';

dotenv.config({ path: '../.env' });
console.log('Connecting to Redis at:', process.env.REDIS_URL);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const CHANNEL = 'chat';

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('chat message', (msg) => {
    pub.publish(CHANNEL, JSON.stringify(msg));
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

sub.subscribe(CHANNEL);
sub.on('message', (_channel, message) => {
  const parsed = JSON.parse(message);
  io.emit('chat message', parsed);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
