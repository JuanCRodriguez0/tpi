import express from "express";
import session from "express-session";
import sequelize from "./db/config.js";
import "./models/index.js";
import { connectDatabase } from "./models/index.js";
import authRoutes from './routes/auth.js';


// CONSTANTES
const app = express();
const PORT = process.env.PORT;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'clave_secreta',
    resave: false,
    saveUninitialized: false,
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


app.use('/', authRoutes);


// SERVIDOR
connectDatabase();
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
})
