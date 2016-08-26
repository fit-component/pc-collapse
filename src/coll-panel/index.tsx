import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classNames from 'classnames'
import * as $ from 'jquery'
import * as module from './module'
import {others} from '../../../../common/transmit-transparently/src'
import './index.scss'

export default class CollPanel extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()
    private toggleTimeout: any
    private $dom: JQuery
    private height: number

    constructor(props: any) {
        super(props)
        this.toggleTimeout = null
    }

    componentDidMount() {
        this.$dom = $(ReactDOM.findDOMNode(this))
        this.setState({
            contentHeight: this.$dom.find('[data-fit-coll-content]').outerHeight()
        })
    }

    componentWillReceiveProps() {
        this.setState({
            contentHeight: this.$dom.find('[data-fit-coll-content]').outerHeight()
        })
    }

    handleClick() {
        this.setState({
            finish: false
        }, ()=> {
            this.props.onChange(this.props.activeKey)
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
        const {className, active, header, children} = this.props
        const _others = others(new module.Props(), this.props)

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
        let height:any = null
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
            <div {..._others} className={classes}>
                <div className="panel-heading"
                     onClick={this.handleClick.bind(this)}>
                    <i className={rightChevronClass}
                       style={{marginRight: 5}}/>{header}
                </div>
                <div className={panelCollapseClass}
                     style={contentContainerStyle}>
                    <div data-fit-coll-content>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}
