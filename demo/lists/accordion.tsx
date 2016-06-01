import * as React from 'react'
import {Collapse, CollPanel} from '../../src'

const text = (
    <div style={{padding:10}}>
        百度百科是百度公司推出的一部内容开放、自由的网络百科全书平台，其测试版于2006年4月20日上线，正式版在2008年4月21日发布，截止2015年5月，百度百科已经收录了超过1155万的优质词条，用户数高达540万人以上，几乎涵盖了所有已知的知识领域。
    </div>
)

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <Collapse defaultValue={'2'}
                      accordion>
                <CollPanel header="panel header 1"
                           key="1">
                    {text}
                </CollPanel>
                <CollPanel header="panel header 2"
                           key="2">
                    {text}
                </CollPanel>
                <CollPanel header="panel header 3"
                           key="3">
                    {text}
                </CollPanel>
            </Collapse>
        )
    }
}