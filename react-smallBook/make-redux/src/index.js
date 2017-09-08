function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action) // 覆盖原对象
    listeners.forEach((listener) => listener())
  }
  dispatch({})
  return { getState, dispatch, subscribe }
}

function renderApp (newAppState, oldAppState = {}) { // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
  if (newAppState === oldAppState) return // 数据没有变化就不渲染了
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return // 数据没有变化就不渲染了
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return // 数据没有变化就不渲染了
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}



function stateChanger (state, action) {
  if (!state) {
    return {
      title: {
        text: 'React.js 小书',
        color: 'red'
      },
      content: {
        text: 'React.js 小书内容',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state // 没有修改，返回原来的对象
  }
}

const store = createStore(stateChanger)
let oldState = store.getState() // 缓存旧的 state
store.subscribe(() => {
  const newState = store.getState() // 数据可能变化，获取新的 state
  renderApp(newState, oldState) // 把新旧的 state 传进去渲染
  oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
})

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色



function reducer(state = [],action){
  if(!state){
    state = []
  }
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

const st = createStore(reducer)
st.subscribe(() => {
  const newState = st.getState()
  console.log(newState)
})

st.dispatch({
  type: 'ADD_USER',
  user: {
    username: 'Lucy',
    age: 12,
    gender: 'female'
  }
})

st.dispatch({
  type: 'ADD_USER',
  user: {
    username: 'hesy',
    age: 24,
    gender: 'man'
  }
})

st.dispatch({
  type: 'ADD_USER',
  user: {
    username: 'hesy2323232',
    age: 24,
    gender: 'man'
  }
})

st.dispatch({
  type: 'ADD_USER',
  user: {
    username: 'hesy1',
    age: 24,
    gender: 'man'
  }
})
st.dispatch({
  type: 'ADD_USER',
  user: {
    username: 'hesy2',
    age: 24,
    gender: 'man'
  }
})


st.dispatch({
  type: 'DELETE_USER',
  index: 2
})


st.dispatch({
  type: 'UPDATE_USER',
  index: 2,
  user: {
    username: 'Tomy',
    age: 12,
    gender: 'male'
  }
})

st.dispatch({
  type: 'UPDATE_USER',
  index: 3,
  user: {
    username: 'make',
    age: 12,
    gender: 'male'
  }
})