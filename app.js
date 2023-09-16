const express = require("express");
const axios = require("axios");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");


app.use(express.static('public'));



app.get("/", (req, res) => {

  res.render("index", {weather: null, error: null});
 
});
// Handle the /weather route
app.get("/weather", async (req, res) => {
    // Get the city from the query parameters
    const city = req.query.city;
    const apiKey = "fe32af4a48696cec5604a6e13093d407";
  
    // Add your logic here to fetch weather data from the API
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    let weather;
    let error = null;
    try {
      const response = await axios.get(APIUrl);
      weather = response.data;
    } catch (error) {
        res.render("index", { weather: null, error: "Please enter a valid city name." });
    }
    // Render the index template with the weather data and error message
    res.render("index", { weather, error });
  });
  
  // Start the server and listen on port 3000 or the value of the PORT environment variable
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });

app.post("/home", function(req, res){
    res.redirect("/");
})