import * as React from 'react'

export interface PropsInterface {
    /**
     * 是否激活
     */
    active?: boolean

    /**
     * 对应key
     */
    activeKey?: string|number

    /**
     * 状态被修改
     */
    onChange?: (activeKey?: string|number)=>void

    [x: string]: any
}

export class Props implements PropsInterface {
    active = false
    activeKey = ''
    onChange = ()=> {
    }
}

export interface StateInterface {
    contentHeight?: number
    finish?: boolean
}

export class State implements StateInterface {
    contentHeight = 0
    finish = true
}