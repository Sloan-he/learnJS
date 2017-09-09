import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import './index.css';

function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化 state
  return { getState, dispatch, subscribe }
}

const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

const store = createStore(themeReducer)



class Header extends Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor () {
    super()
    this.state = { themeColor: '' }
  }
  componentWillMount () {
    this._updateThemeColor()
    const {store} = this.context
    store.subscribe(() => this._updateThemeColor())
  }

  _updateThemeColor () {
    const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }
  render () {
    return (
        <h1 style={{ color: this.state.themeColor }}>React.js 小书</h1>
    )
  }
}


class ThemeSwitch extends Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor () {
    super()
    this.state = { themeColor: '' }
  }
  componentWillMount () {
    this._updateThemeColor()
    const {store} = this.context
    store.subscribe(() => this._updateThemeColor())
  }

  _updateThemeColor () {
    const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }
  handleSwitchColor(color){
    const {store} = this.context
    store.dispatch({
      type: 'CHANGE_COLOR',
      themeColor: color
    })
  }
  render () {
    return (
        <div>
          <button style={{ color: this.state.themeColor }} onClick={this.handleSwitchColor.bind(this,'red')}>Red</button>
          <button style={{ color: this.state.themeColor }} onClick={this.handleSwitchColor.bind(this,'blue')}>Blue</button>
        </div>
    )
  }
}

class Content extends Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor () {
    super()
    this.state = { themeColor: '' }
  }
  componentWillMount () {
    this._updateThemeColor()
    const {store} = this.context
    store.subscribe(() => this._updateThemeColor())
  }

  _updateThemeColor () {
    const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }
  render () {
    return (
        <div>
          <p style={{ color: this.state.themeColor }}>React.js 小书内容</p>
          <ThemeSwitch />
        </div>
    )
  }
}


class Index extends Component {
  static childContextTypes = {
    store:PropTypes.object
  }
  getChildContext(){
    return {store}
  }
  render () {
    return (
        <div>
          <Header />
          <Content />
        </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
