//setup Dependencies
var connect = require('connect'),
    express = require('express'),
    port = (process.env.PORT || 8081),
    underscore = require('underscore');


//Setup Express
var server = express.createServer();
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "secret!"}));
    console.log("dirname ", __dirname);
    server.use(express.static(__dirname + '/public'));
    server.use(server.router);
});

//setup the errors
server.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.jade', { locals: {
                  title : '404 - Not Found',
                  description: 'NOT FOUND',
                  author: 'Elle Beal',
                  analyticssiteid: 'XXXXXXX' //will need eventually
                },
                status: 404 });
    } else {
        res.render('500.jade', { locals: {
                  title : 'The Server Encountered an Error',
                  description: 'Server Error',
                  author: 'Elle Beal',
                  analyticssiteid: 'XXXXXXX',
                  error: err
                },status: 500 });
    }
});
server.listen( port);

//Setup Socket.IO // todo: convert to socket calls
// var io = io.listen(server);
// io.sockets.on('connection', function(socket){
//   console.log('Client Connected');
//   socket.on('message', function(data){
//     socket.broadcast.emit('server_message',data);
//     socket.emit('server_message',data);
//   });
//   socket.on('disconnect', function(){
//     console.log('Client Disconnected.');
//   });
// });


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

server.get('/', function(req,res){
  res.render('index.jade', {
    locals : {
              title : 'Twist Leap',
              description: 'twister for fingers',
              author: 'Elle Beal',
              analyticssiteid: 'XXXXXXX'
            }
  });
});

server.get('/game', function(req,res){
  res.render('game.jade', {
    locals :{
             title : 'Twist Leap - New Game',
             description: 'new game',
             author: 'Elle Beal'
            }
  });
});

server.get('/game-win', function(req,res){
  res.render('game-win.jade', {
    locals :{
             title : 'Twist Leap - Game Over',
             description: 'game over',
             author: 'Elle Beal'
            }
  });
});

server.get('/game-lose', function(req,res){
  res.render('game-lose.jade', {
    locals :{
             title : 'Twist Leap - Game Over',
             description: 'game over',
             author: 'Elle Beal'
            }
  });
});


//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res){
    throw new NotFound("not found");
});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://0.0.0.0:' + port );
