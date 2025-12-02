"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables before any other imports
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const prisma_1 = __importDefault(require("./config/prisma"));
const PORT = process.env.PORT || 5000;
// Graceful shutdown handler
const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} received. Closing server gracefully...`);
    try {
        // Disconnect Prisma
        await prisma_1.default.$disconnect();
        console.log('✅ Prisma disconnected');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
    }
};
// Start server
const server = app_1.default.listen(PORT, () => {
    console.log('=================================');
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`📡 Listening on port ${PORT}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    console.log('=================================');
});
// Graceful shutdown handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
// Unhandled promise rejection handler
process.on('unhandledRejection', (reason) => {
    console.error('❌ Unhandled Rejection:', reason);
    gracefulShutdown('unhandledRejection');
});
exports.default = server;
//# sourceMappingURL=server.js.map