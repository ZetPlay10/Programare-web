const express = require('express');
const router = express.Router();
const users = require('../db/users');

router.get('/login', (req, res) => {
    res.render('login'); 
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        req.session.user = user;
        res.redirect('/meciuri'); 
    } else {
        res.send('Eroare: Credențiale invalide. <a href="/login">Încearcă din nou</a>');
    }
});

module.exports = router;