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

}))

app.use('/', indexRoutes)
app.use('/search', searchRoutes)
app.use('/user', userRoutes)




app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
