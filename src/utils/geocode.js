const request = require('request')

const geocode = (address , callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2hpcnN0eTE5OTkiLCJhIjoiY2tyYzFxejlrMTNybTJ2cXV0NGYyY3RwZCJ9.y_tRuXcUx9DEvHwv6jrmSQ'
     
    request({ url , json : true},(error ,  { body }) =>{
        if(error){
        callback('Unable to connect to location services' , undefined)
        }else if(body.features.length === 0) {
          callback('Unable to get results.Try with different search terms' , undefined)
        }else {
          callback(undefined , {
            longitude : body.features[1].center[0],
            latitude :  body.features[1].center[1],
            location :  body.features[0].place_name
          })
        }
  
    })
  
  }

  module.exports = geocode