import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(process.env.PORT || '5556', 10);

const server = app.listen(PORT, () => {
  console.log(`\n🚀 PDA BLISS Backend Server`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Server running at: http://localhost:${PORT}`);
  console.log(`   API Health: http://localhost:${PORT}/api/health\n`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default server;
