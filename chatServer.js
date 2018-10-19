var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server)
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('server running...')

app.get('/', function(req, res){
	res.sendfile(__dirname + '/chatIndex.html')
});

io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('connected: %s Sockets Connected', connections.length);

	// Disconnect
	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket), 1);
	console.log('Disconnected: %s Sockets connected', connections.length)
	});
	
});