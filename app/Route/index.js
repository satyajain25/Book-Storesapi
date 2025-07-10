
import authRoutes from "./authRoute/authRoutes.js"
import bookRoutes from './bookRoute/bookRoutes.js'
export default function setupRoutes(app) {
    app.use('/api', authRoutes);
    app.use('/api', bookRoutes);
}
