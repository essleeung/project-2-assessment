const express = require('express');
const methodOverride = require('method-override');
const db = require('./models')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////


//GET- root route
app.get('/', (req, res) => {
    db.widget.findAll()
    .then(widgets => {
        res.render('index', {widgets})
    })
    .catch(err => 
        console.log("ERROR!", err)
    )}
)
//POST- add a widget
app.post('/', (req, res) => {
    db.widget.create(req.body)
    .then(widget => {
        console.log("success! created: ", widget)
        res.redirect('/')
    }).catch(err => {
        console.log("ERROR!", err )
    })
})

//DELETE- delete a widget
app.delete('/:id', (req, res) => {
    db.widget.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/')
    })
    .catch(err => {
        console.log("ERROR!", err )
    })    
})

// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
