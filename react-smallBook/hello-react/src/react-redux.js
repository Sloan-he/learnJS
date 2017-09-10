/**
 * Created by Admin on 2017/9/10.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }

        render () {
            const { store } = this.context
            let stateProps = mapStateToProps(store.getState())
            // {...stateProps} 意思是把这个对象里面的属性全部通过 `props` 方式传递进去
            return <WrappedComponent {...stateProps} />
        }
    }
    return Connect
}