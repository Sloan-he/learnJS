/**
 * Created by Admin on 2017/11/14.
 */
module.exports = function(app){
  app.get('/',function(req,res){
    res.redirect('/posts')
  })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/posts', require('./posts'))
  app.use(function(req,res,next){
    if(!res.headersSent){
      res.status(404).render('404')
    }else{
      next()
    }
  })
}
