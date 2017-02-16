var router = require('koa-router')();
var auth = require('koa-basic-auth');
var credentials = { name: 'admin', pass: 'password' };
var chalk = require('chalk');

router.get('/', function *(){
	yield this.render('index', {title: 'Home'});
});

//router.get('/index',auth(credentials), function *(){
//	yield this.render('index', {title: 'Home'});
//});

router.get('/error', function *(){
	yield this.render('error', {title: '404'});
});

// Set up authentication here as first middleware. This returns an error if user is not authenticated.
router.get('/protected', auth(credentials), function *(){
  	yield this.render('protected', {title: 'protected'}),
      console.log(chalk.cyan('ok'));
});

module.exports = router;
