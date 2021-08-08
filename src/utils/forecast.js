const request = require("request")

const forecast = (latitude , longtude , callback) =>{
const url = 'http://api.weatherstack.com/current?access_key=9b8628782de3218e79d1379ade633e40&query='+ latitude +','+ longtude +'&units=f'

request({url , json : true},(error, { body } )=>{
   if(error){
       callback('Unable to connect to forcast' , undefined)
   }else if( body.error){
      callback('Unable to find Location', undefined)
   }else{
       callback(undefined , 
        //    temperature : body.current.temperature,
        //    propprecep :  body.current.feelslike
         body.current.weather_descriptions[0] + ' . It is currently ' + body.current.temperature + ' degree out. And it feels like ' + body.current.feelslike +' degrees.There is a '+body.current.precip + '% chance of rain. And humidity is ' + body.current.humidity + '%')

       
   }
})
}

module.exports = forecast