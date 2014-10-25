var https = require('https');
var future = require('future');
var utils = require("./utils");

function getNumberOfIssues(iterator, currentPage, nbIssues) {
  iterator = typeof iterator !== 'undefined' ? iterator : 0;
  currentPage = typeof currentPage !== 'undefined' ? currentPage : 1;
  nbIssues = typeof nbIssues !== 'undefined' ? nbIssues : 0;

  var functionName = "getNumberOfIssues"
  utils.printLog(functionName, 'launch function nbIssues = '+nbIssues);


  var itemPerPage = 100;
  var options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/repos/angular/angular.js/issues?state=all&per_page=' + itemPerPage + '&page=' + currentPage + utils.credentialApiTesting,
    method: 'GET',
    headers: {
      'User-Agent': 'Karim-Elaktaa'
    }
  };

  var req = https.request(options, function(res) {
    utils.printLog(functionName, 'Status code = ' + res.statusCode)

    var buffer = "",
      data;
    var numberOfItem;

    res.on('data', function(d) {
      // process.stdout.write(d);
      buffer += d;
    });

    res.on("end", function(err) {
      data = JSON.parse(buffer);
      numberOfItem = data.length;
      nbIssues = nbIssues + numberOfItem;

      currentPage++;
      iterator++;
      if (numberOfItem == itemPerPage) {
        getNumberOfIssues(iterator, currentPage, nbIssues);
      }
      else {
        utils.printLog(functionName, 'Total issues ' + nbIssues);
      }
    });

  });


  req.end();

  req.on('error', function(e) {
    console.error(e);
  });


}

getNumberOfIssues();