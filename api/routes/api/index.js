const express = require('express');
const router = express.Router();
const Content = require('../../models/Content');

router.use('/users', require('./users'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//Create Site

router.post('/:user_id/sites/:site_id/pages', function (req, res, next) {
  const saveData = {
    userId: req.params.user_id,
    siteId: req.params.site_id,
    content: req.body.page.content
  };
  const condition = {
    userId: req.params.user_id,
    siteId: req.params.site_id
  };

  console.log(saveData);

  Content.exists(condition)
    .then((data) => {
      if (data == false) {
        Content.create(saveData)
          .then((data) => {
            res.send(data);
          });
      }
    })

})


//UPDATE SITE
router.put('/:user_id/sites/:site_id/pages', function (req, res, next) {
  const condition = {
    userId: req.params.user_id,
    siteId: req.params.site_id
  };

  Content.findOneAndUpdate(condition, { content: req.body.page.content })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
})


//GET SITE
router.get('/:user_id/sites/:site_id', function (req, res, next) {
  const condition = {
    userId: req.params.user_id,
    siteId: req.params.site_id
  };

  Content.findOne(condition)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
})


//DELETE SITE
router.delete('/:user_id/sites/:site_id', function (req, res, next) {
  const condition = {
    userId: req.params.user_id,
    siteId: req.params.site_id
  };

  Content.remove(condition)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
})


module.exports = router;