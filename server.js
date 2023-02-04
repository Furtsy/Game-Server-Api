const fastify = require('fastify')({ logger: true });
const path = require('path');;
const Gamedig = require('gamedig');

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
});


fastify.get('/api/:oyun/kullanicilar/:ip/:port', (request, reply) => {
  var oyun = request.params.oyun
  var ip = request.params.ip
  var port = request.params.port
  Gamedig.query({
    type: oyun,
    host: ip,
    port: port
  }).then((state, error) => {
    const json = { Oyuncular: `${state.players.map(player => player.name)}` }
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(json)
  }).catch((error) => {
    reply.send(error)
  });
})




fastify.get('/api/:oyun/isim/:ip/:port', (request, reply) => {
  var oyun = request.params.oyun
  var ip = request.params.ip
  var port = request.params.port
  Gamedig.query({
    type: oyun,
    host: ip,
    port: port
  }).then((state, error) => {
    const json = { Sunucu_İsmi: `${state.name}` }
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(json)
  }).catch((error) => {
    reply.send(error)
  });
})

fastify.get('/api/:oyun/map/:ip/:port', (request, reply) => {
  var oyun = request.params.oyun
  var ip = request.params.ip
  var port = request.params.port
  Gamedig.query({
    type: oyun,
    host: ip,
    port: port
  }).then((state) => {
    const json = { Map: `${state.map}` }
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(json)
  }).catch((error) => {
    reply.send(error)
  });
})


fastify.get('/api/:oyun/online/:ip/:port', (request, reply) => {
  var oyun = request.params.oyun
  var ip = request.params.ip
  var port = request.params.port
  Gamedig.query({
    type: oyun,
    host: ip,
    port: port
  }).then((state) => {
    const json = { Maks: `${state.maxplayers}`, Online: `${state.players.length}` }
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(json)
  }).catch((error) => {
    reply.send(error)
  });
})

fastify.get('/api/:oyun/ping/:ip/:port', (request, reply) => {
  var oyun = request.params.oyun
  var ip = request.params.ip
  var port = request.params.port
  Gamedig.query({
    type: oyun,
    host: ip,
    port: port
  }).then((state) => {
    const json = { Ping: `${state.ping}` }
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(json)
  }).catch((error) => {
    reply.send(error)
  });
})

fastify.get('/api/:oyun/bilgi/:ip/:port', (request, reply) => {
  var oyun = request.params.oyun
  var ip = request.params.ip
  var port = request.params.port
  Gamedig.query({
    type: oyun,
    host: ip,
    port: port
  }).then((state) => {
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(state.raw)
  }).catch((error) => {
    reply.send(error)
  });
})

fastify.get('/', function (req, reply) {
  reply.sendFile('index.html')
})

fastify.get('/kullanim', function (req, reply) {
  reply.sendFile('kullanımbilgi.html')
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
    console.log(`${fastify.server.address().port} portundan başladım`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
