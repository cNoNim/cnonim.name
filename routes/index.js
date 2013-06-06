/*
 * GET home page.
 */

exports.index = function (req, res) {
  res.render('index',
    { title: 'Уголок cNoNim\'а',
      description: 'cNoNim\'s Web Site',
      keywords: ['cnonim', 'web site']
    });
};