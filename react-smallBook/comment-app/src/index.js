import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import './index.css';

class LikeButton extends Component {
  constructor () {
    super()
    this.state = {
      isLiked: false,
      count:0
    }
  }
  static defaultProps = {
    likedText:'取消',
    unlikedText:'点赞'
  }
  handleClickOnLikeButton () {
    this.setState({isLiked:!this.state.isLiked})
  }
  render () {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked ? this.props.likedText : this.props.unlikedText}
      </button>
    )
  }
}


class Index extends Component {
  render() {
    return (
      <div>
        <LikeButton unlikedText={'赞'} />
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
