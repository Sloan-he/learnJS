import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import { Provider ,connect } from 'react-redux'




const userReducer = (state = [],action) =>{
  if(action.type === 'ADD_USER'){
    return [...state,action.user]
  }
  if(action.type === 'DELETE_USER'){
    return [...state.slice(0,action.index),...state.slice(action.index+1)]
  }
  if(action.type === 'UPDATE_USER'){
    return [
      ...state.slice(0,action.index),
      {...state[action.index],...action.user},
      ...state.slice(action.index+1)
    ]
  }
  return state
}
const store = createStore(userReducer)



class User extends Component {
  _del(index){
    console.log(index)
    this.props.del(index)
  }
  _update(){
    this.props.update({index:this.props.index,user:this.props.user})
  }
  render () {
    const {user} = this.props
    return (
      <div>
        <div>Name: {user.username}</div>
        <div>Age: {user.age}</div>
        <div>Gender: {user.gender}</div>
        <button onClick={this._del.bind(this,this.props.index)}>删除</button>
        <button onClick={this._update.bind(this)}>更新</button>
      </div>
    )
  }
}

class UsersList extends Component {
  constructor(props){
    super(props)
    this.state = {
      user:props.user,
      username:'',
      age:'',
      gender:''
    }
  }
  handleInput = (e) =>{
    let state = this.state
    state[e.target.name] = e.target.value.trim()
    this.setState(state)
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      user:nextProps.user
    })
  }
  _add(){
    this.props.add({username:this.state.username,age:Number(this.state.age),gender:this.state.gender})
  }
  render () {
    return (
      <div>
        {/* 输入用户信息，点击“新增”按钮可以增加用户 */}
        <div className='add-user'>
          <div>Username: <input type='text' name="username" onChange={this.handleInput.bind(this)} value={this.state.username} /></div>
          <div>Age: <input type='number' name="age" onChange={this.handleInput.bind(this)} value={this.state.age} /></div>
          <div>Gender:
            <label>Male: <input type='radio' name='gender' value='male'  onChange={this.handleInput.bind(this)} /></label>
            <label>Female: <input type='radio' name='gender' value='female' onChange={this.handleInput.bind(this)} /></label>
          </div>
          <button onClick={this._add.bind(this)}>增加</button>
        </div>
        {/* 显示用户列表 */}
        <div className='users-list'>
          {
            this.state.user.map((view,i) =>
              <User del={this.props.del} update={this.props.update} user={view} key={i} index={i}/>
            )
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) =>{
  return {
    user:state
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    add:(user) =>{
      dispatch({user:user,type:'ADD_USER'})
    },
    del:(index) =>{
      dispatch({index:index,type:'DELETE_USER'})
    },
    update:(action) =>{
      console.log({...action,type:'UPDATE_USER'})
      dispatch({...action,type:'UPDATE_USER'})
    }
  }
}

UsersList = connect(mapStateToProps,mapDispatchToProps)(UsersList)

ReactDOM.render(
  <Provider store={store}>
    <UsersList />
  </Provider>,
  document.getElementById('root')
)
