const request=require('request')

const forecast=(long,lat,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=6b332a86b250d25f06f91720392cb051&query='+lat+','+long

    request({url,json:true},(error,{body})=>{

        if(error){
            callback('Unable to connect to weather service.',undefined)
        } else if(body.error){
            callback('Unable to find the location.',undefined)
        } else{            
            callback(undefined, body.current.weather_descriptions[0]+ ". It is currently "+
                                body.current.temperature+" degrees out.It feels like "+
                                body.current.feelslike+" degrees out.")        
        }
    })
}

module.exports=forecast