// A simple Vue app to display my antplanner schedule
const TEST_URL = 'https://antplanner.appspot.com/schedule/load?username=areksoatW19'
var GET_URL = 'https://antplanner.appspot.com/schedule/load?username='
var myusername = 'areksoatW19'

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
        username: 'placeholder'
    },

    methods: {
        getUsername: function(){
            fetch(TEST_URL, {
                method: "GET",
                mode: "cors",
                headers: {
                    //"Content-Type": "application/json",
                    //"Content-Type": "application/x-www-form-urlencoded",
                    "Content-Type": "text/plain"
                },
                credentials: "include"
            })
            .then(function(response) {
                if(response.ok){
                    console.log("We OK");
                    console.log(response.json());
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