import express from "express";
import session from "express-session";
import sequelize from "./db/config.js";
import "./models/index.js";
import { connectDatabase } from "./models/index.js";
import authRoutes from './routes/auth.js';
import homeRoutes from './routes/home.js';


// CONSTANTES
const app = express();
const PORT = process.env.PORT;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// RUTAS
app.get('/', (req, res) => {
    res.render('auth/login');
})

app.get('/register', (req, res) => {
    res.render('auth/register');
})

app.get('/home', (req,res) => {
    res.render('home');
})

app.use('/', homeRoutes);

app.use('/', authRoutes);


// SERVIDOR
connectDatabase();
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
})
