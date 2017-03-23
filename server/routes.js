var path = require("path"),
    cities = require("./controllers/cities"),
    items = require("./controllers/items");

module.exports.initialize = function(app, router) {

  router.get('/cities', cities.getCities);
  router.get('/city/:city', cities.getCity);
  router.get('/citydata/:city', cities.getCityData);
  router.get('/article/:city/:item', items.getArticle);
  router.get('/articles/:city', items.getArticles);

  app.use('/api/', router);

  //render index page
  app.use(function (req, res) {
    var home = path.resolve(__dirname + '/../dist/index.html');
    res.sendFile(home);
  });
};
