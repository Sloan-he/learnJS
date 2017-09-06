import React ,{Component} from 'react';
//import App from './App';
import './index.css';
import Comment from './Comment'



export default class CommentList extends Component {
  static defaultProps = {
    comments:[]
  }
  render() {
    return (
      <div>
        {
          this.props.comments.map((comment,i) =>
            <Comment comment={comment} key={i}/>
          )
        }
      </div>
    )
  }
}
