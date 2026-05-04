const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// --- RUTA DE LOGIN (Afișare formular) ---
router.get('/login', (req, res) => {
    res.render('login'); 
});

// --- RUTA DE LOGIN (Procesare date) ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.send('Eroare: Userul nu există. <a href="/login">Încearcă din nou</a>');
        }

        // Verificăm parola direct aici, e cel mai sigur
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            req.session.user = { id: user._id, email: user.email, username: user.username };
            return res.redirect('/meciuri'); 
        } else {
            return res.send('Eroare: Parola incorectă. <a href="/login">Încearcă din nou</a>');
        }
    } catch (error) {
        console.error('Eroare la login:', error);
        res.status(500).send('Eroare de la server.');
    }
});


// --- RUTA DE REGISTER (Afișare formular) ---
router.get('/register', (req, res) => {
    res.send(`
        <h2>Creează cont nou</h2>
        <form method="POST" action="/register">
            <input name="username" placeholder="Nume utilizator" required /><br><br>
            <input name="email" type="email" placeholder="Email" required /><br><br>
            <input name="password" type="password" placeholder="Parola" required /><br><br>
            <button type="submit">Înregistrare</button>
        </form>
    `);
});

// --- RUTA DE REGISTER (Creare cont) ---
router.post('/register', async (req, res) => {
    try {
        console.log("1. Am primit datele:", req.body);
        const { username, email, password } = req.body;

        // CRIPTĂM PAROLA - Altfel nu iei punctajul pe cerință!
        console.log("2. Criptez parola...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("3. Salvez în MongoDB...");
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword // Aici salvăm parola ascunsă, nu aia clară
        });

        console.log("4. GATA! User creat.");
        res.send('Cont creat cu succes! <a href="/login">Loghează-te aici</a>');
        
    } catch (error) {
        console.error("Eroare gravă:", error);
        res.send("A dat eroare: " + error.message);
    }
});

// --- RUTA DE LOGOUT ---
router.get('/logout', (req, res) => {
    req.session.destroy(); 
    res.redirect('/login');
});

module.exports = router;