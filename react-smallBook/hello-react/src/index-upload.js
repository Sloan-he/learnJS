import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState} from 'draft-js';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Header extends Component {
	constructor(props){
		super(props)
		this.state = {
			editorState: EditorState.createEmpty(),
		}
	}
	uploadCallback = (file) =>{
		console.log(file)
		return new Promise((resolve,reject) =>{
			resolve({data:{link:"http://localhost:3000/qq.png"}})
		})
	}

	onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  }
  render () {
    return (
      <div>
        <h1>React 小书</h1>
        <Editor editorState={this.state.editorState}
          onEditorStateChange={this.onEditorStateChange} toolbar={{image:{uploadCallback:this.uploadCallback,uploadEnabled:true}}} />
      </div>
    )
  }
}



ReactDOM.render(
  <Header />,
  document.getElementById('root')
);
