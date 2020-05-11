const router = require('express').Router();
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: { type: String, required: true },
    html: { type: String, required: false},
    css: { type: String, required: false },
    js: { type: String, required: false },
    password: { type: String, required: false }
}, {
    timestamps: true,
});

const Game = mongoose.model('Game', gameSchema);

router.route('/').get((req, res) => {
    Game.find()
    .then(games => res.json(games))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const html = req.body.html;
    const css = req.body.css; 
    const js = req.body.js;
    const password = req.body.password;

    const newGame= new Game({
        title,
        html,
        css,
        js,
        password
    });

    newGame.save()
    .then(() => res.json(newGame.id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Game.findById(req.params.id)
    .then(Game => res.json(Game))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Game.findById(req.params.id)
    .then(game => {
        if (game.password == req.body.password) {
            Game.findByIdAndDelete(req.params.id)
            .then(() => res.json('0'))
            .catch(err => res.status(400).json('Error: ' + err));

        } else {
            res.json('1')
        }
        })
        .catch(err => res.status(400).json('Error: ' + err));


            // Game.findByIdAndDelete(req.params.id)
            //     .then(() => res.json('Game deleted.'))
            //     .catch(err => res.status(400).json('Error: ' + err));

})

router.route('/update/:id').post((req, res) => {
    Game.findById(req.params.id)
    .then(game => {
        if (game.password == req.body.password) {
            game.title = req.body.title;
            game.html = req.body.html;
            game.css = req.body.css;
            game.js = req.body.js;
            game.password = req.body.password;

            game.save()
            .then(() => res.json('Game updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        } else {
            res.json('Incorrect password!')
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;