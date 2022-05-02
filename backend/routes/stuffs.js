const router = require('express').Router();
let Stuff = require('../models/stuff.model');

// this will get everything in the stuffs collection
router.route('/').get((req, res) => {
    // if you would like to find something specific
    // inside the find(<mongodb_selector>)
    Stuff.find()
        .then(stuffs => res.json(stuffs))
        .catch(err => res.status(400).json('Error ' + err));
});

// this will add a new 'stuff' document to the db
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const condition = req.body.condition;

    const newStuff = new Stuff({
        name,
        quantity,
        condition,
    });

    newStuff.save()
        .then(() => res.json('Stuff added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// this will get something from the Stuffs collection by its id.
// since its searching by id, it will only return 1 document.
router.route('/:id').get((req, res) => {
    Stuff.findById(req.params.id)
        .then(stuff => res.json(stuff))
        .catch(err => res.status(400).json('Error: ' + err));
});

// this will delete something by its id
router.route('/:id').delete((req, res) => {
    Stuff.findByIdAndDelete(req.params.id)
        .then(() => res.json('Stuff deleted!'))
        .catch(() => res.status(400).json('Error: ' + err));
});

// this will update something by its id.
router.route('/update/:id').post((req, res) => {
    // first find by id
    Stuff.findById(req.params.id)
        .then(stuff => {
            // update data
            stuff.name = req.body.name;
            stuff.quantity = Number(req.body.quantity);
            stuff.condition = req.body.condition;

            // save
            stuff.save()
                .then(() => res.json('Stuff updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
