const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Tudor'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Tudor'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: 'Please help me :)',
    title: 'Help',
    name: 'Tudor'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  
  if (!address)
  {
    return res.send({
      error: 'Please provide an address'
    })
  }

  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error)
    {
      return res.send({
        error
      })
    }
    
    forecast(latitude, longitude, (error, forecastData) => {
      if (error)
      {
        return res.send({
          error
        })
      }

      res.send({
        location,
        forecast: forecastData,
        address
      })
    })
  })  
})



app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: '404',
    name: 'Tudor'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404',
    name: 'Tudor'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})