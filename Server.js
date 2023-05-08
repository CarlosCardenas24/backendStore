const stripe = require('stripe')('SECRET_KEY_HERE');
const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors());
/* app.use(express.urlencoded({ extended: false })); */
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req.body)
    res.send("hello world")
})

// POST method route
app.post('/checkout', async (req, res) => {
    res.send(req.body)
})

app.listen(4000, () => console.log('Server is up'))