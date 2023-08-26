import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import { geoCode } from './utils/geocode.js';
import { forecast } from './utils/forecast.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abbasali Nathani'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abbasali Nathani'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abbasali Nathani',
        helpText: 'This is a message for help page!',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        });
    }
    geoCode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abbasali Nathani',
        errorMessage: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abbasali Nathani',
        errorMessage: 'Page not found!'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});