const express = require('express');
const app = express();
const http = require('http');
app.use(express.static('public'));
app.listen(8000)
var Ddos = require('ddos')
    var ddos = new Ddos({burst:3,limit:4,maxcount:15,maxexpiry:120,checkinterval:1,testmode:false,responseStatus:429,errormessage:'Atmalan'});
    app.use(ddos.express);

app.get('/api/:oyun/kullanicilar/:ip/:port', (request, response) => {
  const Gamedig = require('gamedig');
  var oyun = request.params.oyun
  var ip = request.params.ip
  var port = request.params.port
Gamedig.query({
    type: oyun,
    host: ip,
    port: port
}).then((state, error) => {
const json = {Oyuncular: `${state.players.map(player => player.name)}` }
    response.json(json)
}).catch((error) => {
    response.json(error)
});
})




app.get('/api/:oyun/isim/:ip/:port', (request, response) => {
  const Gamedig = require('gamedig');
  var oyun = request.params.oyun
  var ip = request.params.ip
  var port = request.params.port
Gamedig.query({
    type: oyun,
    host: ip,
    port: port
}).then((state, error) => {
const json = {Sunucu_İsmi: `${state.name}` }
    response.json(json)
}).catch((error) => {
    response.json(error)
});
})

app.get('/api/:oyun/map/:ip/:port', (request, response) => {
  const Gamedig = require('gamedig');
  var oyun = request.params.oyun
  var ip = request.params.ip
  var port = request.params.port
Gamedig.query({
    type: oyun,
    host: ip,
    port: port
}).then((state) => {
const json = {Map: `${state.map}` }
    response.json(json)
}).catch((error) => {
    response.json(error)
});
})


app.get('/api/:oyun/online/:ip/:port', (request, response) => {
  const Gamedig = require('gamedig');
  var query = require('game-server-query');
  var oyun = request.params.oyun
  var ip = request.params.ip
  var port = request.params.port
Gamedig.query({
    type: oyun,
    host: ip,
    port: port
}).then((state) => {
const json = { Maks: `${state.maxplayers}`,  Online: `${state.players.length}` }
    response.json(json)
}).catch((error) => {
    response.json(error)
});
})

app.get('/api/:oyun/ping/:ip/:port', (request, response) => {
  const Gamedig = require('gamedig');
  var query = require('game-server-query');
  var oyun = request.params.oyun
  var ip = request.params.ip
  var port = request.params.port
Gamedig.query({
    type: oyun,
    host: ip,
    port: port
}).then((state) => {
   const json = {Ping: `${state.ping}` }
    response.json(json)
}).catch((error) => {
    response.json(error)
});
})

app.get('/api/:oyun/bilgi/:ip/:port', (request, response) => {
  const Gamedig = require('gamedig');
  var query = require('game-server-query');
  var oyun = request.params.oyun
  var ip = request.params.ip
  var port = request.params.port
Gamedig.query({
    type: oyun,
    host: ip,
    port: port
}).then((state) => {
    response.json(state.raw)
})
})


const router = express.Router();
const path = require('path');
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});


router.get('/kullanim',function(req,res){
  res.sendFile(path.join(__dirname+'/kullanımbilgi.html'));
  //__dirname : It will resolve to your project folder.
});



console.log("basladim")
app.use('/', router);
app.use('/kullanim', router);

app.get('/', (res, req) => {


 var Ddos = require('ddos')
    var ddos = new Ddos({burst:3,limit:4,maxcount:15,maxexpiry:120,checkinterval:1,testmode:false,responseStatus:429,errormessage:'atmalan'});
    app.use(ddos.express);
})

app.get('/kullanim', (res, req) => {


 var Ddos = require('ddos')
    var ddos = new Ddos({burst:3,limit:4,maxcount:15,maxexpiry:120,checkinterval:1,testmode:false,responseStatus:429,errormessage:'atmalan'});
    app.use(ddos.express);
})