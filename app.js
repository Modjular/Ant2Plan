// Server side

var express = require("express");
var app = express();
const fetch = require('node-fetch');


const TEST_URL = 'https://antplanner.appspot.com/schedule/load?username=areksoatW19'


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/url", (req, res, next) => {

    fetch(TEST_URL, {
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

            console.log("DATA: ---> ");
            var ant_res_parsed = JSON.parse(ant_res.data.data);
            var just_codes = parse_antplanner_data(ant_res_parsed);
            console.log("CODES", just_codes)

            // Before we pass on the data, it should get parsed
            res.json(just_codes);
        })
    })
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });
});

var parse_antplanner_data = function(arr){
    var codes = new Set();
    for(let i = 0; i < arr.length; i++){
        codes.add(arr[i].title);
    }
    return JSON.stringify(Array.from(codes));
}