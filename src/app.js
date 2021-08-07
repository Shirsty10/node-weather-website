const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '..'))     //.. -> for 1 step upper folder and ../.. for 1 more upper folder
// console.log(path.join(__dirname , '../public'))

const app = express()
const port =process.env.PORT || 3000

//define path for Express Cofig
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) =>{
   res.render('index' , {
     title : 'Weather App',
      name :'Shirsty'
   })
})

app.get('/help', (req,res) =>{
  res.render('help',{
    title : 'Help Page',
    name : 'Shirsty sharma',
    helpText : 'This is some helpful text'
  })
})

app.get('/about',(req,res) =>{
    res.render('about' ,{
      title : 'About Me',
      name : 'Shirsty Sharma'
    })
})

app.get('/weather' , (req , res) =>{
   if(!req.query.address){
     return res.send({
       error: 'You must provide address'
     })

   }

   geocode(req.query.address , (error, { latitude , longitude , location} ={}) =>{
     if(error){
        return res.send({error})
     }
      
     forecast(latitude , longitude , (error, forecastData) =>{
       if(error) {
         return res.send({error})
       }

         res.send({
           forecast : forecastData,
           location,
           address : req.query.address
         })
       
     })
   })

    // res.send({
    //     forecast : 'Cloudy',
    //     location : 'Muzaffarnagar',
    //     address : req.query.address
    // })
})

app.get('/products' , (req,res) =>{
  console.log(req.query)
   res.send({
     product : []
   })
})

app.get('/help/*' , (req,res) =>{
   res.render('404', {
     title : '404 Page',
     name : 'Shirsty Sharma',
     errorText : 'Help Article not Found'
   })
})

app.get('*' , (req,res) =>{
  res.render('404',{
    title : '404 page',
    name : 'Shirsty Sharma',
    errorText : 'Page Not Found'
  })
})


//app.com
//app.com/help
// app.com/about

app.listen(port , () => {     // 2 arg - port ,optional funtion ....default port = 3000
  console.log('Server is up and running on port '+ port)   //Not display on browser
})


// app.get('' , (req , res) =>{       // 2 argument - route and funt(req,res)
//    res.send('<h1>Weather</h1>')   //display on browser page
// })

// app.get('/help' , (req , res) =>{
//   res.send({
//       name : 'Shirsty',
//       age : 21
//   })
// })

// app.get('/about' , (req , res) =>{
//     res.send('<h1>About Page</h1>')
// })