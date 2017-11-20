/**
 * Created by Admin on 2017/11/14.
 */

const express = require('express')
const router = express.Router()
const PostModel = require('../models/posts')
const CommentModel = require('../models/comments')
const checkLogin = require('../middlewares/check').checkLogin

//GET /posts 所有用户或者特定用户的文章页
// eg:GET /posts?author=xxx
router.get('/',function(req,res,next){
  const author = req.query.author
  PostModel.getPosts(author)
    .then(function (posts) {
      res.render('posts', {
        posts: posts
      })
    })
    .catch(next)
})

// POST /posts/create 发表一篇文章
router.post('/create', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content

  try{
    if(!title.length){
      throw new Error('请填写标题')
    }
    if(!content.length){
      throw new Error('请填写正文')
    }
  }catch (e){
    req.flash('error',e.message)
    return res.redirect('back')
  }
  let post = {
    author:author,
    title:title,
    content:content,
    pv:0
  }
  PostModel.create(post).then(result =>{
    post = result.ops[0]
    req.flash('success','发表成功')
    res.redirect(`/posts/${post._id}`)
  }).catch(next)
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function (req, res, next) {
  res.render('create',{
    blog:{
      title:'发表内容-sloan-Blog'
    }
  })
})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function (req, res, next) {
  const postId = req.params.postId
  Promise.all([
    PostModel.getPostById(postId), // 获取文章信息
    CommentModel.getComments(postId), // 获取该文章所有留言
    PostModel.incPv(postId)// pv 加 1
  ]).then(result =>{
    const post = result[0]
    const comments = result[1]
    if(!post){
      req.flash('error','该文章不存在或者被管理员删除')
      res.redirect('/posts')
    }
    res.render('post', {
      post: post,
      comments:comments
    })
  }).catch(next)
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id
  PostModel.getRawPostById(postId).then(post =>{
    if(!post){
      req.flash('error','该文章不存在或者被管理员删除')
      res.redirect('/posts')
    }
    if(author.toString() !== post.author._id.toString()){
      req.flash('error','权限不足！')
      res.redirect('/posts')
    }
    res.render('edit',{
      post: post
    })
  }).catch(next)
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  console.log('req session',req.session)
  const postId = req.params.postId
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content
  PostModel.getRawPostById(postId).then(post =>{
    if (!post) {
      req.flash('error','该文章不存在或者被管理员删除')
      res.redirect('/posts')
    }
    if(author.toString() !== post.author._id.toString()){
      req.flash('error','权限不足！')
      res.redirect('/posts')
    }
    PostModel.updatePostById(postId, { title: title, content: content }).then(() =>{
      req.flash('success', '编辑文章成功')
      // 编辑成功后跳转到上一页
      res.redirect(`/posts/${postId}`)
    }).catch(next)
  }).catch(next)
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id
  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        req.flash('error','该文章不存在或者被管理员删除')
        res.redirect('/posts')
      }
      if (post.author._id.toString() !== author.toString()) {
        req.flash('error','权限不足！')
        res.redirect('/posts')
      }
      PostModel.delPostById(postId)
        .then(function () {
          req.flash('success', '删除文章成功')
          // 删除成功后跳转到主页
          res.redirect('/posts')
        })
        .catch(next)
    }).catch(next)
})

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const postId = req.params.postId
  const content = req.fields.content
  try{
    if(!content.length){
      throw new Error('请填写留言内容')
    }
  }catch (e){
    req.flash('error',e.message)
    return res.redirect('back')
  }
  const comment = {
    author: author,
    postId: postId,
    content: content
  }
  CommentModel.create(comment)
    .then(function () {
      req.flash('success', '留言成功')
      // 留言成功后跳转到上一页
      res.redirect('back')
    })
    .catch(next)
})

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, function (req, res, next) {
  const commentId = req.params.commentId
  const author = req.session.user._id
  CommentModel.getCommentById(commentId).then(comment =>{
    if (!comment) {
      req.flash('error','留言不存在')
      return res.redirect('back')
    }
    if (comment.author.toString() !== author.toString()) {
      req.flash('error','没有权限删除留言')
      return res.redirect('back')
    }
    CommentModel.delCommentById(commentId)
      .then(function () {
        req.flash('success', '删除留言成功')
        // 删除成功后跳转到上一页
        res.redirect('back')
      })
      .catch(next)
  })
})

module.exports = router
