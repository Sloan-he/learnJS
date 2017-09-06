import React ,{Component} from 'react';
//import App from './App';
import './index.css';
import CommentInuput from './CommentInput'
import CommentList from './CommentList'


export default class CommentApp extends Component {
  constructor(){
    super()
    this.state = {
      comments:[]
    }
  }
  handleSubmitComment (comment) {
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    let state = this.state
    state.comments.push(comment)
    this.setState(state)
  }
  render() {
    return (
      <div className='wrapper'>
        <CommentInuput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList comments={this.state.comments}/>
      </div>
    )
  }
}

