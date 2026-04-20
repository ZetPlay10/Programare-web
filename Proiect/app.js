require('dotenv').config(); 
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'parola_mea_super_secreta_pentru_proiect', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 60 * 60 * 1000 } 
}));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/meciuri', (req, res) => {    
    if (req.session.user) {
        res.send(`<h1>Logare reușită!</h1> <p>Salut, ${req.session.user.email}</p>`);
    } else {
        res.send('Acces interzis! Nu ești logat.');
    }
});

app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serverul a pornit pe http://localhost:${PORT}`);
});