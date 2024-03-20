
const geocode = require('./control/geocode')
const forcast = require('./control/forcast')

const express = require("express")

const app = express()
const port = process.env.PORT || 3000
const path = require("path")

const x = (path.join(__dirname, '../public'))
app.use(express.static(x))
//==========================================

app.set('view engine', 'hbs');

const viewsDirectory = path.join(__dirname, '../temp1/views')
app.set('views', viewsDirectory)

var hbs = require('hbs')

const partialsPath = path.join(__dirname, '../temp1/partials')

hbs.registerPartials(partialsPath)
//==============================================

app.get('/', (req, res) =>{
    res.render('index', {
        title: "home page",
        desc: "this is home page",


    })
})


app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error: "please enter an address"
        })
    }
    geocode(req.query.address, (error, data) =>{
        if(error){
           return res.send({error})
        }
        forcast(data.longtitude, data.latitude, (error, forcastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast: forcastData,
                location: "your country is: " + req.query.address
            })
        })
    })

})

app.get('*', (req, res) =>{
    res.send('404 page not found')
})
//=================================
app.listen(port, () =>{
    console.log(`app is listening on port ${port}`)
})
