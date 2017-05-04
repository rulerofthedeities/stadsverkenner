var path = require("path"),
    cities = require("./controllers/cities"),
    items = require("./controllers/items");

module.exports.initialize = function(app, router) {

  router.get('/cities', cities.getCities);
  router.get('/city/:city', cities.getCity);
  router.get('/city/data/:city', cities.getCityData);
  router.get('/city/slides/:city', items.getCitySlides);
  router.get('/article/head/:city/:item', items.getArticleHeader);
  router.get('/article/info/:city/:item', items.getArticleInfo);
  router.get('/article/location/:city/:item', items.getArticleLocation);
  router.get('/article/photos/:city/:item', items.getArticlePhotos);
  router.get('/articles/:city', items.getArticles);
  router.get('/articles/map/:city', items.getArticlesMap);
  router.get('/traffic/cities', items.getCitiesTraffic);
  router.get('/traffic/articles', items.getArticlesTraffic);

  app.use('/api/', router);

  //render index page
  app.use(function (req, res) {
    var home = path.resolve(__dirname + '/../dist/index.html');
    res.sendFile(home);
  });
};
