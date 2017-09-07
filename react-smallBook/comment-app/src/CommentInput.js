import React ,{Component} from 'react';
//import App from './App';
import './index.css';



export default class CommentInput extends Component {
  constructor(){
    super()
    this.state = {
      username:'',
      content:''
    }
  }
  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }
  handleContentChange (event) {
    this.setState({
      content: event.target.value
    })
  }
  handleSubmit () {
    if (this.props.onSubmit) {
      const { username, content } = this.state
      let createdTime = new Date()
      this.props.onSubmit({username, content,createdTime})
    }
    this.setState({ content: '' })
  }
  componentDidMount(){
    this.textarea.focus()
  }
  handleUsernameBlur(event){
    this._saveUsername(event.target.value)
  }
  _saveUsername(username){
    localStorage.setItem('username', username)
  }
  componentWillMount(){
    this._loadUsername()
  }
  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }
  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input onBlur={this.handleUsernameBlur.bind(this)} value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea ref={el => this.textarea = el} value={this.state.content} onChange={this.handleContentChange.bind(this)}/>
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>发布</button>
        </div>
      </div>
    )
  }
}
