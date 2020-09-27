const router = require("express").Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login', {user: req.user});
})

router.get('/logout', (req,res) => {
  req.logout();
  req.redirect('/')
});

router.get('/google', passport.authentication('google', {
  scope: ['profile']
}));

