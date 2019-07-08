const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode.js')
const forecast = require('./Utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //views -> templates
const partialPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //views -> templates
hbs.registerPartials(partialPath)

//Setup static directory to use
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ilyass Chadli'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me ..',
        name: 'Ilyass Chadli'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page ..',
        message: 'help message contact our email for more informations ..',
        name: 'Yassire Mtioui'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.adress) {
        return res.send({
            error: 'You must provide an Adress option'
        })
    }
    geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => { //={} ES6 ASIDE DEFAULT FUNCTION PARAMETERS
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData, location,
                adress: req.query.adress
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search option'
        })
    }


    console.log(req.query)
    res.send({
        products: []
    })
})




app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found ..',
        name: 'Ilyass Chadli'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page/url Not Found ..',
        name: 'Ilyass Chadli'
    })
})


// app.com
// app.com/about
// app.com/help

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})