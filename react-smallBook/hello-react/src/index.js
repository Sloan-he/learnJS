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
  render () {
    const { user } = this.props
    return (
      <div>
        <div>Name: {user.username}</div>
        <div>Age: {user.age}</div>
        <div>Gender: {user.gender}</div>
        <button>删除</button>
      </div>
    )
  }
}

class UsersList extends Component {
  render () {
    return (
      <div>
        {/* 输入用户信息，点击“新增”按钮可以增加用户 */}
        <div className='add-user'>
          <div>Username: <input type='text' /></div>
          <div>Age: <input type='number' /></div>
          <div>Gender:
            <label>Male: <input type='radio' name='gender' value='male' /></label>
            <label>Female: <input type='radio' name='gender' value='female' /></label>
          </div>
          <button>增加</button>
        </div>
        {/* 显示用户列表 */}
        <div className='users-list'>
          {
            this.props.user.map(view =>
              <User user={view} key={view.index} />
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
    add:() =>{
      console.log('add')
    },
    del:() =>{
      console.log('del')
    },
    update:() =>{
      console.log('update')
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
