var app = require('../index').default;
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('server is listening on port ' + port);
});
