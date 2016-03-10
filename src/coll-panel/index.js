import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import $ from 'jquery'
import './index.scss'

export default class CollPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contentHeight: 0,
            finish: true
        }

        this.toggleTimeout = null
    }

    componentDidMount() {
        this.$dom = $(ReactDOM.findDOMNode(this))
        this.setState({
            contentHeight: this.$dom.find('#content').outerHeight()
        })
    }

    componentWillReceiveProps() {
        this.setState({
            contentHeight: this.$dom.find('#content').outerHeight()
        })
    }

    handleClick() {
        this.setState({
            finish: false
        }, ()=> {
            this.props.onChange(this.props._key)
        })

        if (this.toggleTimeout) {
            clearTimeout(this.toggleTimeout)
        }

        this.toggleTimeout = setTimeout(()=> {
            this.setState({
                finish: true
            })
        }, 300)
    }

    render() {
        const {className, active, header, children, ...others} = this.props

        const classes = classNames({
            '_namespace': true,
            'panel': true,
            'panel-default': true,
            [className]: className
        })

        const panelCollapseClass = classNames({
            'panel-collapse': true,
            'collapse': true,
            'in': true,
            'show': active
        })

        const rightChevronClass = classNames({
            'fa': true,
            'fa-chevron-right': true,
            'rotate-pre': true,
            'rotate': active
        })

        // 设置height属性
        let height = null
        height = active ? this.state.contentHeight : null
        if (this.state.finish) {
            if (active) {
                height = 'auto'
            } else {
                height = 0
            }
        }
        let contentContainerStyle = {
            height: height
        }

        this.height = height

        return (
            <div {...others} className={classes}>
                <div className="panel-heading"
                     onClick={this.handleClick.bind(this)}>
                    <i className={rightChevronClass}
                       style={{marginRight:5}}/>{header}
                </div>
                <div className={panelCollapseClass}
                     style={contentContainerStyle}>
                    <div id="content">
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

CollPanel.defaultProps = {
    // @desc 是否激活
    active: false,

    // @desc 对应key
    key: null
}