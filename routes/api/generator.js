const express = require('express')
const route = express()
var fs = require('fs');
var Request = require("request");

let urls = [];


route.get('/', (req, res) => {
  urls = []
  Request.get("https://api.unsplash.com/search/photos/?client_id=0c818841f7cdf80f3c67be359441bf7e3a0982757411a1faffbf6c0cdad7d205&query=" + req.query.tag, (error, response, body) => {
    if (error) {
      console.log("error in get")
      return console.dir(error);
    }
    var data = JSON.parse(body);
    var length = JSON.parse(body).results.length;
    for (var i = 0; i < 2; i++) {
      if (length == 0) {
        break;
      }
      var url = data.results[i].urls.raw;
      urls.push({
        link: url,
        tag: req.query.tag
      })
      var download = function (uri, filename, callback) {
        Request.head(uri, function (err, res, body) {
          Request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
      };
      var path = 'pic - ' + req.query.tag + ' - ' + i + '.png';
      download(url, path, function () {
        console.log(urls)
      });
      //testing
      fs.writeFile("input.json", JSON.stringify(urls), function (err) {
        if (err) throw err;
        // console.log('complete first api call');
      })
    }

  });

  //Second API
  Request.get("https://api.pexels.com/v1/search?per_page=15&page=1&query=" + req.query.tag, {
    headers: {
      'Authorization': '563492ad6f91700001000001c3b17333909346f89919fd61da20522a'
    }
  }, (error, response, body) => {
    if (error) {
      return console.dir(error);
    }

    var data2 = JSON.parse(body);
    var length = JSON.parse(body).photos;
    // console.log(data2);


    for (var i = 0; i < 2; i++) {
      if (length == 0) {
        break;
      }
      var url = data2.photos[i].src.original;
      urls.push({
        link: url,
        tag: req.query.tag
      })
      var download = function (uri, filename, callback) {
        Request.head(uri, function (err, res, body) {
          // console.log('content-type:', res.headers['content-type']);
          // console.log('content-length:', res.headers['content-length']);

          Request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
      };
      // console.log(url)
      // console.log(req.query.tag);
      var path = 'pic2 - ' + req.query.tag + ' - ' + (i + 2) + '.png';
      download(url, path, function () {
        // console.log('done');
      });


    }


    console.log(urls)
    res.send(
      urls
    );

  });



})


exports = module.exports = route

