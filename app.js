var express 				= require('express')
	, exphbs					= require('express-handlebars')
	, path						= require('path')
  , port  	   			= 3000
  , request					= require('request')
  , bodyParser			= require('body-parser')
  	, searchRoutes 	= require('./routes/searchRoutes')
		, userRoutes		= require('./routes/userRoutes')
		, indexRoutes		= require('./routes/index')
	, session					= require('express-session')
	, MongoClient     = require('mongodb').MongoClient
	, db              = require('./db')
	, Users           = require('./models/users')

var app = express();


app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false}))

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookieName: 'session',
  secret: 'lksdgfiertmf',
  resave: false,
  saveUnitialized: true,
  cookie:{maxAge:6000000},
}))

app.use('/', indexRoutes)
app.use('/search', searchRoutes)
app.use('/user', userRoutes)


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err,
        error: {}
    });
});

app.post('/', function(req, res) {

    var user = {
			username: 'gigity',
			fname: 'glen',
			lname: 'quagmire'
		}
    Users.insert(user, function() {
      console.log('It worked!')
    })
})



db.connect('mongodb://dbuser:password@ds053964.mongolab.com:53964/test1', function(err){
  if(err) {
    console.log('Unable to connect to Mongo')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000')
    })
  }
})
