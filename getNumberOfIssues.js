var https = require('https');
var future = require ('future');

var end = false;
var currentPage=98;
var itemPerPage=100;
var nbIssues = 0;
var i =0;

while(i!=2){
  
  i++;
  
  var options = {
  hostname: 'api.github.com',
  port: 443,
  path: '/repos/angular/angular.js/issues?state=all&per_page='+itemPerPage+'&page='+currentPage,
  method: 'GET',
  headers:{'User-Agent':
    'Karim-Elaktaa'}
  };
  
  var req = https.request(options, function(res) {
    // console.log("statusCode: ", res.statusCode);
    // console.log("headers: ", res.headers);
  
      
      var buffer = "", data;
      var numberOfItem;
    res.on('data', function(d) {
      // process.stdout.write(d);
      buffer += d;

    });
    
    res.on("end", function (err) {
        // finished transferring data
        // dump the raw data
        // console.log(buffer);
        console.log("\n");
        data = JSON.parse(buffer);

        // extract the distance and time
        // console.log("Walking Distance: " + route.legs[0].distance.text);
        numberOfItem = data.length;
        nbIssues = numberOfItem;
        console.log("TOT: " + data.length);
              end = true;
              currentPage++;

    }); 
    
    if (numberOfItem != itemPerPage){
      end = true;
    }
    else{
      currentPage++;
    }
  });
  

  
  req.end();
  
  req.on('error', function(e) {
    console.error(e);
  });

}  

console.log("SUPER TOT: " + nbIssues);


