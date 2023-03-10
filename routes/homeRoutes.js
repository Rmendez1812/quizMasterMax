const router = require('express').Router();
const { } = require('../../models');
const withAuth = require('../utils/auth');


router.post('/sign-up', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });
        const users = userData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            users, logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;