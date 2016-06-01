import * as React from 'react'

export interface PropsInterface {
    /**
     * 是否是手风琴模式
     */
    accordion?: boolean

    /**
     * 展开/关闭时的回调
     */
    onChange?: (key?: number|string)=>void

    /**
     * 当前展开的项
     */
    value?: string|number|Array<number|string>

    /**
     * 默认展开项
     */
    defaultValue?: string|number|Array<number|string>

    [x: string]: any
}

export class Props implements PropsInterface {
    accordion = false
    onChange = ()=> {
    }
}

export interface StateInterface {
    /**
     * 当前展开项,初始化时是 value | defaultValue,之后只有 value 改变才会固定
     */
    value?: Array<number|string>
}

export class State implements StateInterface {

}