import React from 'react'
import CollPanel from '../coll-panel'
import classNames from 'classnames'
import _ from 'lodash'
import './index.scss'

const arrayOrStrEqual = (item, arr)=> {
    if (_.isArray(arr)) {
        return _.includes(arr, item)
    }
    return item === arr
}

export default class Collapse extends React.Component {
    constructor(props) {
        super(props)

        let activeKey = this.props.activeKey || this.props.defaultActiveKey
        if (!this.props.accordion && !_.isArray(activeKey)) {
            activeKey = [activeKey]
        }

        this.state = {
            activeKey: activeKey
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('activeKey' in nextProps) {
            this.setState({
                activeKey: nextProps.activeKey
            })
        }
    }

    handleChange(key) {
        let activeKey = this.state.activeKey
        if (!this.props.accordion) {
            if (_.isArray(activeKey)) {
                if (_.includes(activeKey, key)) {
                    _.pull(activeKey, key)
                } else {
                    activeKey.push(key)
                }
            } else {
                activeKey = key
            }
        } else {
            if (activeKey === key) {
                activeKey = null
            } else {
                activeKey = key
            }
        }

        this.setState({
            activeKey: activeKey
        }, ()=> {
            this.props.onChange(key)
        })
    }

    render() {
        const {className, children, accordion, ...others} = this.props
        const classes = classNames({
            '_namespace': true,
            [className] : className
        })

        let Children = React.Children.map(children, (item)=> {
            return React.cloneElement(item, {
                active  : arrayOrStrEqual(item.key, this.state.activeKey),
                onChange: this.handleChange.bind(this),
                key     : item.key,
                _key    : item.key
            })
        })

        return (
            <div {...others} className={classes}>
                {Children}
            </div>
        )
    }
}

Collapse.defaultProps = {
    // 是否是手风琴模式
    accordion: false,

    // @desc 值修改的回调
    onChange: (key)=> {
    }
}