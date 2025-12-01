import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes/index';
import { errorHandler, notFound } from './middleware/errorHandler';
import { apiRateLimiter } from './middleware/rateLimiter';



const app: Application = express();

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Rate limiting
app.use('/api', apiRateLimiter);

// Mount API routes
app.use('/api', routes);

// Root route
app.get('/', (_req, res) => {
    res.json({
        success: true,
        message: 'News API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth',
            users: '/api/users',
            articles: '/api/articles',
            categories: '/api/categories',
            tags: '/api/tags',
            comments: '/api/comments',
            media: '/api/media',
        },
    });
});

// 404 handler
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

export default app;