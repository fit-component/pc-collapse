import * as React from 'react'
import CollPanel from '../coll-panel'
import * as classNames from 'classnames'
import * as _ from 'lodash'
import * as module from './module'
import {others} from '../../../../common/transmit-transparently/src'
import './index.scss'

const arrayOrStrEqual = (item: any, arr: any)=> {
    if (_.isArray(arr)) {
        return _.includes(arr, item)
    }
    return item === arr
}

export default class Collapse extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    constructor(props: any) {
        super(props)
    }

    componentWillMount() {
        let activeKey: any = this.props.value || this.props.defaultValue
        if (!this.props.accordion && !_.isArray(activeKey)) {
            activeKey = [activeKey]
        }
        this.setState({
            value: activeKey
        })
    }

    componentWillReceiveProps(nextProps:module.PropsInterface) {
        if ('value' in nextProps) {
            let activeKey: any = nextProps.value || nextProps.defaultValue
            if (!this.props.accordion && !_.isArray(activeKey)) {
                activeKey = [activeKey]
            }
            this.setState({
                value: activeKey
            })
        }
    }

    handleChange(key:any) {
        let activeKey = this.state.value
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
            value: activeKey
        }, ()=> {
            this.props.onChange(key)
        })
    }

    render() {
        const {className, children, accordion} = this.props
        const _others = others(new module.Props(), this.props)
        const classes = classNames({
            '_namespace': true,
            [className]: className
        })

        let Children = React.Children.map(children, (item: any)=> {
            return React.cloneElement(item, {
                active: arrayOrStrEqual(item.key, this.state.value),
                onChange: this.handleChange.bind(this),
                key: item.key,
                activeKey: item.key
            })
        })

        return (
            <div {..._others} className={classes}>
                {Children}
            </div>
        )
    }
}