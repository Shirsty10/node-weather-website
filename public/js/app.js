// console.log('Client side javascript is loaded..')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{   //using fetch() we can fetch json data from an urland parse it into js object
//    response.json().then((data) => {
//       console.log(data)
//    })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit' , (e) =>{   // e - event
    e.preventDefault()       //function to prevent default behaviour of browser of refreshing it
    
    const location = search.value
    //console.log(location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+ location).then((response) =>{
       
     response.json().then((data) =>{
         if(data.error) {
             messageOne.textContent = data.error
            //console.log(data.error)
         }else{
             messageOne.textContent = data.location
             messageTwo.textContent = data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
         }

     })
})
})



