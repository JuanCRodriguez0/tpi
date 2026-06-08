import express from "express";
import session from "express-session";
import sequelize from "./db/config.js";
import "./models/index.js";
import { connectDatabase } from "./models/index.js";
import authRoutes from './routes/auth.js';
import homeRoutes from './routes/home.js';
import postRoutes from './routes/post.js'
import commentRoutes from './routes/comments.js';
import ratingRoutes from './routes/rating.js';
import profileRoutes from './routes/profile.js';
import { authMiddleware } from './middleware/auth.js';




// CONSTANTES
const app = express();
const PORT = process.env.PORT;


// MIDDLEWARES
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // produccion cambiar a true
        maxAge: 24 * 60 * 60 * 1000, // 24h
        httpOnly: true,
        sameSite: 'lax',
    },
}));

// MOTOR DE PLANTILLAS
app.set('view engine', 'pug');
app.set('views', './views');


// RUTAS PUBLICAS
app.use('/', authRoutes);


// RUTAS

app.use('/', authMiddleware, homeRoutes);

app.use('/', authMiddleware, postRoutes);

app.use('/', authMiddleware, authRoutes);

app.use('/', authMiddleware, commentRoutes);

app.use('/', authMiddleware, ratingRoutes);

app.use('/', authMiddleware, profileRoutes);


// SERVIDOR
connectDatabase();
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
})
