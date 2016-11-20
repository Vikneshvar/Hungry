module.exports = function(app){
  // Get Homepage
  app.get('/', function(req, res) {
    res.sendFile('/index.html');
  });
};
