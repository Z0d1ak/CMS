import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Base.css';
import {Col, Layout, Menu, Row} from 'antd';
import {
    UsbOutlined,
    SnippetsOutlined,
    IdcardOutlined,
    AreaChartOutlined,

    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,

    EditOutlined,
    DeleteOutlined,
    HighlightOutlined
} from '@ant-design/icons';
import { Typography } from 'antd';
import {Avatar,Dropdown,Card } from 'antd';
import { Pagination } from 'antd';
import SearchBox from "../Filters/Filters"
import { BackTop } from 'antd';

import Employees from "../Employees/Employees"
import AllTexts from "../AllTexts/AllTexts"
import Infographic from "../Infographic/Infographic"
import InWork from "../InWork/InWork"



const { Header, Sider, Content } = Layout;




export class Base extends React.Component<{},{}> {
    state = {
        collapsed: false,
        contentBox:<div></div>
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    generateProfileMenu() {
        let optList:string[]=["Профиль","Настройки","Выход"]
        return ( <Dropdown overlay={
            <Menu>
                {optList.map((r, i) => {
                return (

                        <Menu.Item>
                            <a>{r}</a>
                        </Menu.Item>
                        )
                        })}
            </Menu>
        } placement="bottomLeft">
            <Avatar className="userBox" size={40} icon={<UserOutlined />}/>
                    </Dropdown>);
    };

    generateMenu() {
        let optList:string[]=["В работе","Все статьи","Сотрудники","Инфографика"]
        let ElementsList:JSX.Element[]=[<InWork/>,<AllTexts/>,<Employees/>,<Infographic/>]
        let iconList:JSX.Element[]=[<UsbOutlined/>,<SnippetsOutlined />,<IdcardOutlined />,<AreaChartOutlined />]
        return (<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {optList.map((r, i) => {
                return (
                    <Menu.Item key={i} icon={iconList[i]} onClick={()=>{this.setState({contentBox:ElementsList[i]})}}>
                        {r}
                    </Menu.Item>
                )
            })}
        </Menu>);
    };


    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    {this.generateMenu()}
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        {this.generateProfileMenu()}

                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {this.state.contentBox}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Base;

