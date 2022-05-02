// import router
const router = require('express').Router();

// import model
let User = require('../models/user.model');

// this will get all users from the db
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// this will post a new user to the db. If there is an error
// send the error back
router.route('/register').post(async (req, res) => {
    try {
        // .create is a mongoose method that allows posting to the db.
        // this will create a new document in the collection.
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.json({ status: 'ok' });

    } catch (err) {
        res.json({ status: 'error', error: err })
    }
});

// this is just another way to make a post request.
router.route('/register2').post((req, res) => { 
    // get the data from req
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    // create an instance of a user
    const newUser = new User({username, email, password});

    // save user to db
    newUser.save()
        // if the user is added successfully send 'user added'
        .then(() => res.json('user added'))
        // if there is an error send the error
        .catch(err => res.status(400).json('Error: ' + err));
});

// always include this at the end of a routes file.
module.exports = router;
