
const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    // TODO: Add a comment describing the functionality of this expression
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // TODO: Add a comment describing the functionality of this expression
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // TODO: Add a comment describing the functionality of this method
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // TODO: Add a comment describing the functionality of this method
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/signup', async (req, res) => {
    try {
        let  {email,password,username}=req.body;
      // TODO: Add a comment describing the functionality of this expression
      const count = await User.count({ where: { email: req.body.email } });
  /** req.body
email:
'deneme@deneme.com'
password:
'password'
username:
'denemeuser' */
      if (count>0) {
        res
          .status(400)
          .json({ message: 'bu emaıille baska kullanıcı var' });
        return;
      }
      // user oluşturulması lazım password bcrypt 'le olacak
      let userObj= await User.create({
        name: username,
        email: email,
        password:password,
      });
      
  
      res.json({ user: userObj, message: 'You are now sıned up!' });

  
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;