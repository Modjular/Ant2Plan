// Server side

var express = require("express");
var app = express();
const fetch = require('node-fetch');


const TEST_URL = 'https://antplanner.appspot.com/schedule/load?username=areksoatW19'
const URL = 'https://antplanner.appspot.com/schedule/load?username=';

app.listen(8080, () => {
    console.log("Server running on port 8080");
});



// SO, we grab data from antplanner, 
app.get("/url", (req, res, next) => {

    console.log("REQ RECEIVED:", req.query.username);
    res.setHeader("Access-Control-Allow-Origin", "https://modjular.github.io");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    try{

    // Hopefully a username query has been provided
    // If not provided, we throw?    
    fetch(URL + req.query.username, {
        method: "GET",
        //mode: "cors",
        headers: {
            "Content-Type": "application/json",
            //"Content-Type": "application/x-www-form-urlencoded",
            //"Content-Type": "text/plain"
        }
    })
    .then(function(response) {
        response.json()
        .then( data => ({
            data: data,
            status: response.status
        }))
        .then( ant_res => {
            console.log(ant_res.status, ant_res.data);

            if(ant_res.data.success == false){
                // we throw?
                res.json({"success": "false"});
                throw("Antplanner get was not successful");
            }

            console.log("DATA: ---> ", );
            var ant_res_parsed = JSON.parse(ant_res.data.data);
            var just_codes = parse_antplanner_data(ant_res_parsed);
            console.log("CODES", just_codes)

            // Before we pass on the data, it should get parsed
            return res.json({"success": true, data: just_codes});
        })
    })
    .catch(function(error) {
        console.log('Username ' + req.query.username + " not found: " + error.message);
    });
    }
    catch(e){
        console.log('Username ' + req.query.username + " not found: ");
    }
});

var parse_antplanner_data = function(arr){
    var codes = new Set();
    for(let i = 0; i < arr.length; i++){
        codes.add(arr[i].title);
    }
    //return JSON.stringify(Array.from(codes));
    return Array.from(codes);
}