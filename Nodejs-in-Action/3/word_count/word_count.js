const fs = require('fs')
const fileDir = './text'
let completedTasks = 0
let tasks = []
let wordCounts = {}


//任务完成后会掉
function checkIfComplete(){
  completedTasks++
  if(completedTasks === tasks.length){
    //所有任务完成后，列出每个文件中每个单词以及次数
    for(let index in wordCounts){
      console.log(index + ':' + wordCounts[index])
    }
  }
}

function countWordsInText(text){
  let words = text.toString().toLowerCase().split(/\W+/).sort()
  for(let index in words){
    let word = words[index]
    if(word){
      wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1
    }
  }
}

fs.readdir(fileDir,function(err,files) {
  if (err) throw err
  for (let index in files) {
    let task = (function (file) {
      return function () {
        fs.readFile(file, function (err, text) {
          if (err) throw err
          countWordsInText(text)
          checkIfComplete()
        })
      }
    })(fileDir + '/' + files[index])
    tasks.push(task)
  }
  for (let task in tasks) {
    tasks[task]()
  }
})