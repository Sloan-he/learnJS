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
  handleClickOnLikeButton () {
    //this.setState({
    //  isLiked: !this.state.isLiked
    //})
    this.setState((prevState) => {
      return prevState.count+=1
    })

    this.setState((prevState) => {
      return prevState.count+=1
    })
    this.setState((prevState) => {
      return prevState.count+=1
    })
  }
  render () {
    console.log(this.state)
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked ? '取消' : '点赞'}{this.state.count} 👍
      </button>
    )
  }
}

class Index extends Component {
  render() {
    return (
      <LikeButton />
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
