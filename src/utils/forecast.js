const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url =  'http://api.weatherstack.com/current?access_key=aa0f28a1625bad0af2bf98857b2f70ef&query=' + latitude + ',' + longitude + '&units=f'
  
  request ({ url, json: true}, (error, response, body) => {
    if (error)
    {
      callback('Unable to connect to weather service')
    }
    else
    {
      if (body.error)
      {
        callback('Unable to find location')
      }
      else
      {
        const { weather_descriptions: description, temperature, feelslike, humidity } = body.current
      
        callback(undefined, description[0] + '. It is currently ' + temperature + ' Fahrenheit degrees out. It feels like ' + feelslike + ' Fahrenheit degrees out. The humidity is ' + humidity + '%.')
      }
    }
  })
}

module.exports = forecast