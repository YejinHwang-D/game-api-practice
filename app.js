var request = require('request');
var express = require('express');
var url = require('url');
var qs = require('querystring');
var ejs = require('ejs');
const { query } = require('express');
var app = express();

//client status
var client_id = 'MozQfvL028Tl8TPiciih';
var client_secret = 'qiutH_5h0U';

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);



//form 입력 주소
app.get('/', (req, res) => {
  res.render('index.html');
})

//여기 주소로 querystring 넘기면 보여짐
app.get('/search/local', function (req, res) {
  res_list = []; //body parse해서 담을 Array

  var searchLocal = req.query.searchLocal;
  var searchHospital = req.query.searchHospital;
  var query = encodeURI(searchLocal + ' ' + searchHospital);

  var api_url = 'https://openapi.naver.com/v1/search/local?query=' + query + '&display=5&start=1&sort=comment'; // json 결과
   var options = {
       url: api_url,
       headers: {
         'X-Naver-Client-Id':client_id, 
         'X-Naver-Client-Secret': client_secret
        }
    };
    
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {
         'Content-Type': 'text/html;charset=utf-8'
        });
       res_body = JSON.parse(body);
       for (var i=0; i<5; i++) {
        res_list.push({
          "title": res_body.items[i].title,
          "link": res_body.items[i].link,
          "category": res_body.items[i].category,
          "telephone": res_body.items[i].telephone,
          "address": res_body.items[i].address,
          "mapx": res_body.items[i].mapx,
          "mapy": res_body.items[i].mapy
        })
      }
      res.render('index.ejs', {"list": res_list}, (error, html) => {
        if (error) {
          console.log(error);
        }
        else {
          res.end(html);
        }
      })
     } 
     else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
       console.error(error)
     }
   });
 });



 app.listen(3000, function () {
   console.log('http://127.0.0.1:3000/search/local?query=검색어 app listening on port 3000!');
 });