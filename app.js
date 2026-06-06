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
app.use(express.static('public'));

// MOTOR DE PLANTILLAS
app.set('view engine', 'pug');
app.set('views', './views');

// RUTAS
app.use('/', homeRoutes);

app.use('/', postRoutes);

app.use('/', authRoutes);

app.use('/', commentRoutes);

app.use('/', ratingRoutes);


// SERVIDOR
connectDatabase();
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
})
