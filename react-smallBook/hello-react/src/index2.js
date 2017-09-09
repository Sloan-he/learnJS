import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
//import Clock from './Clock';
import './index.css';

//class LikeButton extends Component {
//  constructor () {
//    super()
//    this.state = {
//      isLiked: false,
//      count:0
//    }
//  }
//  static defaultProps = {
//    likedText:'取消',
//    unlikedText:'点赞'
//  }
//  handleClickOnLikeButton () {
//    this.setState({isLiked:!this.state.isLiked})
//  }
//  render () {
//    return (
//      <button onClick={this.handleClickOnLikeButton.bind(this)}>
//        {this.state.isLiked ? this.props.likedText : this.props.unlikedText}
//      </button>
//    )
//  }
//}
//
//
//
//
//
//

//class Index extends Component {
//  constructor () {
//    super()
//    this.state = { isShowClock: true }
//  }
//  handleShowOrHide(){
//    this.setState({
//      isShowClock: !this.state.isShowClock
//    })
//  }
//
//  render() {
//    return (
//      <div>
//        {this.state.isShowClock ? <Clock /> : null}
//        <button onClick={this.handleShowOrHide.bind(this)}>显示或隐藏时钟</button>
//      </div>
//    )
//  }
//}


//class Card extends Component {
//  render () {
//    return (
//      <div className='card'>
//        <div className='card-content'>
//          {this.props.children}
//        </div>
//      </div>
//    )
//  }
//}



class Index extends Component {
  static childContextTypes = {
    themeColor:PropTypes.string
  }
  constructor(){
    super()
    this.state = {
      themeColor:'red'
    }
  }
  getChildContext(){
    return {themeColor:this.state.themeColor}
  }
  render () {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}

class Header extends Component {
  render () {
    return (
      <div>
        <h2>This is header</h2>
        <Title />
      </div>
    )
  }
}

class Main extends Component {
  render () {
    return (
      <div>
        <h2>This is main</h2>
        <Content />
      </div>
    )
  }
}

class Title extends Component {
  static contextTypes = {
    themeColor:PropTypes.string
  }
  constructor(props,context){
    super(props)
  }
  render () {
    return (
      <h1 style={{ color: this.context.themeColor }}>React.js 小书标题</h1>
    )
  }
}

class Content extends Component {
  render () {
    return (
      <div>
        <h2>React.js 小书内容</h2>
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
