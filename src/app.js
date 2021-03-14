const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app=express()

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Chhavi Garg'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text.',
        title:'Help',
        name:'Chhavi Garg'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Chhavi Garg'
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'No address term is provided'
        })
    }

    geoCode(req.query.address, (error, {longitude,latitude,location}={}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(longitude, latitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast:data,
                location:location,
                address:req.query.address
            })
            
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404 Page!',
        name:'Chhavi Garg',
        errorMsg:'Help Article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 Page!',
        name:'Chhavi Garg',
        errorMsg:'My 404 page!'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})