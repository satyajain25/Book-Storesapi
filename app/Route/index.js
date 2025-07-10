
import authRoutes from "./authRoute/authRoutes.js"
import bookRoutes from './bookRoute/bookRoutes.js'
export default function setupRoutes(app) {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/book', bookRoutes);
}
