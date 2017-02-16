var auth = require('koa-basic-auth');
//Error handling middleware
app.use(function *(next){
  try {
    yield next;
  } catch (err) {
    if (401 == err.status) {
      this.status = 401;
      this.set('WWW-Authenticate', 'Basic');
      this.body = 'You have no access here';
    } else {
      throw err;
    }
  }
});

module.exports = auth, credentials;
