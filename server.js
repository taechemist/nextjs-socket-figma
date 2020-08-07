const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {pingTimeout: 30000});
const next = require('next');
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const webhookSecret = process.env.WEBHOOK_SECRET
const jsonParser = bodyParser.json()

// socket.io server
io.on('connection', (socket) => {
	socket.on('events', (data) => {
		socket.broadcast.emit('events', data);
	});
});

nextApp.prepare().then(() => {

	app.get('*', (req, res) => {
		return nextHandler(req, res);
	});

	app.post('/events',jsonParser , (req, res) => {
		if(req.body.passcode === webhookSecret) {
			io.sockets.emit('events', req.body);
		}
		console.log(req.body);
		res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({status: "success"});
	})

	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
