/**
 * Created by Admin on 2017/11/14.
 */
const express = require('express')
const router = express.Router()

router.get('/:name', function (req, res) {
    res.render('users',{
        name:req.params.name
    })
})

module.exports = router