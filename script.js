const express = require("express")

const bodyParser = require("body-parser")

const https = require("https")

const app = express()

app.use(bodyParser.urlencoded( { extended: false } ))

app.get("/", function(req, res){
    //res.send("API usage demonstration.")
    res.sendFile(__dirname + "/index.html")
   
})

app.post("/", function(req, res){
    const place = req.body.cityName
    const APIkey = "fc1ffbac6cf83c49881fed919399943e"
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&APPID=" + APIkey + "&units=metric"

    https.get(url, function(response){
        console.log(response.statusCode)
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const des = weatherData.weather[0].description
            const place = weatherData.name
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            res.write("<p>the weather currently is " + des + "y</p>")
            res.write("<h4>the temperature in " + place + " is " + temp + " degree celcius</h4>")
            res.write("<img src=" + imgurl + ">")
            res.send()
        })
    })
})

app.listen(3000, function(){
    console.log("server available at port 3000")
})