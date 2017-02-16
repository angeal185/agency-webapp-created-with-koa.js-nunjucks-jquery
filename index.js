var koa = require('koa');
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var router = require('koa-router');
var path = require('path');
var koaNunjucks = require('koa-nunjucks-2');
var staticCache = require('koa-static-cache');
var auth = require('koa-basic-auth');
var chalk = require('chalk');
var favicon = require('koa-favi');
var routes = require('./controllers/routes');
var credentials = { name: 'admin', pass: 'password' };
var tempo = require('tempo');
var app = koa();
var rout = router();

app.context.render = koaNunjucks({
  ext: 'njk',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    autoescape: true,
    watch: true
  }
});


rout.get('/not_found');
app.use( routes.routes());
app.use(favicon());
app.use(serve('./static'));


app.use(function *(next){
  try {
    yield next;
  } catch (err) {
    if (401 == err.status) {
      this.status = 401;
      yield this.redirect('/login');
    } else {
      throw err;
    }
  }
});

app.use(handle404Errors);
function *handle404Errors(next){
  if (404 != this.status) return;
  yield this.render('error');
};

app.use(staticCache(path.join(__dirname, 'static'), {
  maxAge: 0 // 365 * 24 * 60 * 60 //Add these files to caches for a year
}))
// start the server
app.listen(3000);
console.log(chalk.cyan('App is being served at:'),chalk.red('localhost:3000'));
