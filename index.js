const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));



app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");
 
});
app.post("/", function(req, res){
    

    const query = req.body.cityName;
    const apiKey = "fe32af4a48696cec5604a6e13093d407";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+ "&appid="+ apiKey +"&units="+ unit +"";
    https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<h1>The temperature in "+ query +" today is " + temp + " C degrees.</h1>");
        res.write("<p>The weather is currently "+ weatherDescription+ "<p>");
        res.write("<img src=" + imageURL + ">");
        res.send()
        
    })
})

})



app.listen(3000, function() {
    console.log("Server started on port 3000.");
})