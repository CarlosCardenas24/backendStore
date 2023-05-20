require('dotenv').config()

const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY
const stripe = require('stripe')(`${STRIPE_KEY}`)
const express = require('express')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 4000

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
    const newCart = req.body;

    const lineItems = newCart.map((obj) => {
        let {id, quantity} = obj

        return {price: id, quantity: quantity}
    })

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'
    })

    res.send(JSON.stringify(session.url))
})

app.listen(port, () => console.log('Server is up'))