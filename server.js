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

const userAgent = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36' };
var api_key = 'df6d88f2a5bd4280898352a6420dcf56';
  var api_url = 'https://api.rawg.io/api/games?key=' + api_key + 'dates=2019-01-01,2019-12-31&ordering=-added';
  var options = {
    method: 'GET',
    header: userAgent,
    url: 'https://api.rawg.io/api/games/lists/main',
    qs: {
      key: api_key,
      ordering: '-relevance',
      discover: true,
      page_size: 10
    }
  };

  const apiCall = async options => {
    // (I.) promise to return the parsedResult for processing
    const rawgRequest = () => {
      return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
          try {
            //console.log(body);
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      });
    };
    try {
      parsedResult = await rawgRequest();
    } catch (e) {
      console.error(e);
    }
    return parsedResult;
  };


//메인
app.get('/', (req, res) => {
  res.render('index.html');
})

//api 요청 주소
app.get('/api/trending', async (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.json(await apiCall(options));
  console.log('/api/trending endpoint has been called!');
});







//서버 열기
 app.listen(3000, function () {
   console.log('http://127.0.0.1:3000/search/local?query=검색어 app listening on port 3000!');
 });