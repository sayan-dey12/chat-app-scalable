// lib/socket.ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // ✅ change if deployed

export default socket;
