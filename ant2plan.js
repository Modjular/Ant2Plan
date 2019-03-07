// A simple Vue app to display my antplanner schedule
const TEST_URL = 'https://antplanner.appspot.com/schedule/load?username=areksoatW19';
var GET_URL = 'https://antplanner.appspot.com/schedule/load?username=';
var myusername = 'areksoatW19';
const NODE_URL = 'localhost:3000/url';
const HTTP_URL = 'http://192.168.169.7:8080';


var xhr = new XMLHttpRequest();
xhr.open("GET", TEST_URL, );

xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200) {
        console.log("HMMMMMMM")
        console.log(xhr.responseText);
    }
};


var app = new Vue({
    el: '#app',
    data: {
        username: 'placeholder',
        schedule: [
            'foo',
            'bar'
        ]
    },

    methods: {
        getUsername: function(){
            fetch(HTTP_URL + "?username=" + myusername, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    //"Content-Type": "application/x-www-form-urlencoded",
                    //"Content-Type": "text/plain"
                },
                credentials: "include"
            })
            .then(function(response) {
                if(response.ok){
                    console.log("We OK");
                    console.log(response.json());

                    console.log("PARSING...");
                    this.schedule = JSON.parse(response.json());
                }else{
                    console.log("We not ok?");
                    console.log(response.status);
                }
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        },

        mytest: function() {
            xhr.send();
        }
    }
})