const request = require('postman-request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHVkb3J0dXJjdSIsImEiOiJjazhnOW9nNWUwMGc0M2VxcmVpMGw3OTV2In0.tQzBoqQu1X3_yXw9F4-V-g&limit=1'
  
  request({ url, json: true}, (error, response, {features} = {}) => {
    if (error)
    {
      callback('Unable to reach Mapbox Geocoding API') 
    }
    else 
    {
      if (features.length === 0)
      {
        callback('No geocoding results matching the specified location. Try another search')
      }
      else
      {
        callback(undefined, {
          latitude: features[0].center[1],
          longitude: features[0].center[0],
          location: features[0].place_name
        })  
      }
    }
  })
}

module.exports = geocode