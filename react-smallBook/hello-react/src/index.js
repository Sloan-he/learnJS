import React,{Component} from 'react';
import ReactDOM from 'react-dom';
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


class Card extends Component {
  render () {
    return (
      <div className='card'>
        <div className='card-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}



ReactDOM.render(
  <Card>
    <div className='name'>My Name：Lucy</div>
    <p className='age'>
      My Age：<span>12</span>
    </p>
  </Card>,
  document.getElementById('root')
);
