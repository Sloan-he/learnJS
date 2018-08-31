/**
 * Created by Admin on 2018/8/1.
 */
const events = require('events')
const util = require('util')
const fs = require('fs')

const watchDir = './watch',
      processedDir = './done'

function Watcher(watchDir,processedDir){
  this.watchDir = watchDir
  this.processedDir = processedDir
}

util.inherits(Watcher,events.EventEmitter)

Watcher.prototype.watch = function(){
  let watcher = this
  fs.readdir(this.watchDir,function(err,files){
    if(err) throw err
    for(let index in files){
      watcher.emit('process',files[index])
    }
  })
}
Watcher.prototype.start = function(){
  let watcher = this
  fs.watchFile(watchDir,function(){
    watcher.watch()
  })
}

var watcher = new Watcher(watchDir,processedDir)

watcher.on('process',function(file){
  let watchFile = this.watchDir + '/' + file
  let processedFile = this.processedDir + '/' + file.toLowerCase()
  fs.rename(watchFile,processedFile,function(err){
    if(err) throw err
  })
})



watcher.start()