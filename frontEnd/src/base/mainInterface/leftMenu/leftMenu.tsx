import React from 'react';
import 'antd/dist/antd.css';
import './leftMenu.css';
import {Layout, Menu} from 'antd';
import {
    UsbOutlined,
    SnippetsOutlined,
    IdcardOutlined,
    AreaChartOutlined,
} from '@ant-design/icons';

import {
    Link,
    Route
  } from "react-router-dom";


import Employees from "../../contentOptions/employee/employee"
import AllTexts from "../../contentOptions/article/article"
import Infographic from "../../contentOptions/infographics/infographics"
import InWork from "../../contentOptions/task/task"


const {  Sider } = Layout;


interface menuOpt {
    text:string;
    link:string;
    icon:JSX.Element;
    component:JSX.Element;
}

const leftMenuContent: Array<menuOpt> = [ 
    {text:"В работе",link:"/home/inwork", icon:<UsbOutlined/>,component: <InWork/>},
    {text:"Все статьи",link:"/home/alltexts", icon:<SnippetsOutlined />,component:< AllTexts/>},
    {text:"Сотрудник",link:"/home/emplo", icon:<IdcardOutlined />,component:<Employees/>},
    {text:"Инфографика",link:"/home/info", icon:<AreaChartOutlined />,component:<Infographic/>}
];  

export function getLinksLeftMenu() {
    return (
        leftMenuContent.map((r, i) => {
            return (
                <Route path={r.link} >
                    {r.component}
                </Route>
            )
        })
    );
};

function generateMenu() {
    return (<Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        {leftMenuContent.map((r, i) => {
            return (
                <Menu.Item key={i+"lm"} icon={r.icon}>
                    <Link to={r.link}>{r.text}</Link>
                </Menu.Item>
            )
        })}
    </Menu>);
};

export class LeftMenu extends React.Component<{collapsed:boolean},{}> {




    render() {
        return (
                <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                    <div className="logo" />
                    {generateMenu()}
                </Sider>
        );
    }
}

export default {getLinksLeftMenu,LeftMenu}; 

