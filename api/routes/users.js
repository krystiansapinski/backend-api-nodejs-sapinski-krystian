const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Zakładanie konta usera
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => res.status(200).json({ wiadomosc: 'Dodano usera' }))
      .catch((err) => res.status(500).json(err));
  });
});

// logowanie
router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) return res.status(401).json({ wiadomosc: 'Błąd autoryzacji' });
    bcrypt.compare(req.body.password, user.password).then((result) => {
      if (!result)
        return res.status(401).json({ wiadomosc: 'Błąd autoryzacji' });

      const token = jwt.sign({ email: user.email }, process.env.JWT_KEY, {
        expiresIn: '1h',
      });
      return res.status(200).json({ token });
    });
  });
});

module.exports = router;